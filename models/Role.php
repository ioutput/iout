<?php

namespace app\models;


/**
 * This is the model class for table "role".
 *
 * @property int $id 
 */
class Role extends \yii\mongodb\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'role';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'created_at'], 'required'],
            [['status','deleted_at'], 'integer'],
            [[ 'remark','name','menu_ids'], 'string'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
          '_id','name','status','menu_ids','deleted_at','remark','created_at'
        ];
    }

    public static function list($where){
        extract($where);
        $data['page'] = $page??1;
        $data['page_size'] = $page_size??10;
        $query=Self::find()->where(['deleted_at'=>0])->limit($data['page_size'])->offset(($data['page']-1)*$data['page_size']);
        if(isset($name)){
            $query->where(['name'=>$name]);
        }
        $data['total_count'] = (int)$query->count();
        $data['total_page'] = ceil($data['total_count']/$data['page_size']);
        $data['data'] = $query->asArray()->all();
        if($data['data']){
            foreach ($data['data'] as &$v) {
                $v['id'] = ((array)$v['_id'])['oid'];
                $v['status'] = $v['status']==1?'正常':'禁用';
            }
        }
        return $data;
    }
}
