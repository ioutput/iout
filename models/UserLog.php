<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "mmc_self".
 *
 * @property int $id 配单ID
 */
class UserLog extends \yii\mongodb\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user_log';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['sn', 'user_id','username', 'ip'], 'required'],
            //[['user_id'], 'integer'],
            [['username', 'sn','ip','operation'], 'string'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
          '_id','user_id','username','ip','sn','operation','created_at'
        ];
    }

    public static function list($where){
        extract($where);
        $data['page'] = $page??1;
        $data['page_size'] = $page_size??10;
        $query=Self::find()->limit($data['page_size'])->offset(($data['page']-1)*$data['page_size'])->orderBy(['created_at'=>SORT_DESC]);
        if(isset($username)){
            $query->where(['username'=>$username]);
        }
        $data['total_count'] = (int)$query->count();
        $data['total_page'] = ceil($data['total_count']/$data['page_size']);
        $data['data'] = $query->asArray()->all();
        if($data['data'])
            foreach($data['data'] as &$v){
                $v['_id'] = ((array)$v['_id'])['oid'];
            }
        return $data;
    }
    public static function saveLog($event, $userinfo = []){
        $user = Yii::$app->user->identity;
        $model = new self;
        $model->load(['UserLog'=>[
            'ip'=>Yii::$app->request->userIP,
            'sn'=>date('Ymd').uniqid(),
            'created_at'=>date('Y-m-d H:i:s'),
            'operation' =>$event->sender,
            'user_id'=>$userinfo?((array)$userinfo['_id'])['oid']:((array)$user['_id'])['oid'],
            'username'=>$userinfo?$userinfo['username']:$user['username']
        ]]);
        
        return $model->save();
    }
}
