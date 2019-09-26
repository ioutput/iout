<?php

namespace app\models;

use Yii;

/**
 *
 * @property string $name 菜单名称
 * @property int $status 菜单状态
 * @property int $is_menu 是否是菜单
 * @property string $url 跳转链接
 * @property string $remark 备注
 * @property int $pid 上级id
 * @property int $deleted_at 0为不删除，时间戳为删除
 * @property string $icon 按钮
 * @property string $created_at 添加时间
 */
class Menu extends \yii\mongodb\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'menu';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'created_at'], 'required'],
            [[ 'status','is_menu','sort','deleted_at'], 'integer'],
            [['name', 'icon','remark','url','pid'], 'string'],
            /* ['pid' ,  'filter', 'filter' => function(){
            return intval($this->pid);
            }], */
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
          '_id','name','is_menu', 'icon','remark','url','sort','pid','deleted_at','status','created_at'
        ];
    }

    public static function list($where){
        extract($where);
        $data['page'] = $page??1;
        $data['page_size'] = $page_size??10;
        $query=Self::find()->orderBy(['created_at'=>SORT_DESC,'sort'=>SORT_ASC])->limit($data['page_size'])->offset(($data['page']-1)*$data['page_size']);
        if(isset($name)){
            $query->where(['like','name',$name]);
        }
        $data['total_count'] = (int)$query->count();
        $data['total_page'] = ceil($data['total_count']/$data['page_size']);
        $data['data'] = $query->asArray()->all();
        if($data['data'])
            foreach($data['data'] as &$v){
                $v['id'] = ((array)$v['_id'])['oid'];
                $v['status'] = $v['status']==1?'启用':'禁用';
            }
        return $data;
    }
    public static function listById($ids){
        return Self::find()->where(['status'=>1])->andWhere(['in','id',$ids])->all();
    }
    
    public static function listRole($arr,$level=1,$pid=0){
        $data = [];
        if($level>3){return $data;}
        foreach ($arr as $v) {
            
            if($pid==$v['pid']){
                $v['_id'] = ((array)$v['_id'])['oid'];
                $v['title'] = $v['name'];
                $v['value'] = $v['_id'];
                $v['children'] = self::listRole($arr,$level+1,$v['_id']);
                $data[] = $v;
            }
            
        }
        return $data;
    }
}
