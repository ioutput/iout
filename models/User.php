<?php

namespace app\models;
use yii\web\IdentityInterface;
class User extends \yii\mongodb\ActiveRecord implements IdentityInterface
{   
    private static $users =[];
    public static function tableName()
    {
        return 'user';
    }
    public function rules()
    {
        return [
            [['status','deleted_at'], 'integer'],
            [['username','password','remark','salt','role_id'],'string'],
        ];
    }
    public function attributes()
    {
        return [
          '_id','status','username','role_id','deleted_at','username','password','remark','created_at','updated_at','salt'
        ];
    }
    public static function list($params=[])
    {   extract(array_filter($params,function($f){if($f == ''){return false;}return true;}));
        $data['page'] = $page??1;
        $data['page_size'] = $page_size??10;
        $query = Self::find()->where(['deleted_at'=>0])->orderBy(['created_at'=>SORT_DESC])->limit($data['page_size'])->offset(($data['page']-1)*$data['page_size'])->select(['id','username','created_at','updated_at','status','role_id'])->with('role');
        if(isset($username)){
            $query->andWhere(['username'=>$username]);
        }
        if(isset($status)){
            $query->andWhere(['status'=>$status]);
        }
        $data['total_count'] = (int)$query->count();
        $data['total_page'] = ceil($data['total_count']/$data['page_size']);
        $data['data'] = $query->asArray()->all();
        if($data['data']){
            foreach($data['data'] as &$v){
                $v['_id'] = ((array)$v['_id'])['oid'];
                $v['status_name'] = $v['status'] ==1?'启用':'禁用';
            }
        }
  
        return $data;
    }
    /**
     * {@inheritdoc}
     */
    public static function findIdentity($id)
    {
        return isset(self::$users[$id]) ? new static(self::$users[$id]) : null;
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentityByAccessToken($sign, $type = null)
    {       /* $headers = \Yii::$app->request->headers;
            $time = $headers->get('time');
            $token = $headers->get('token');
            $key = '3weae^@#as$*%2365*4rwads';
            $validSign = md5($token.$key.$time);
            $minus = time()-round($time/1000);
            if($validSign == $sign && $minus <24*3600*30){ */
                return self::find()->where(['salt'=>$sign,'deleted_at'=>0])->one();
            //}
                
            //return null;
             
        //return static::findOne(['token'=>$token]);

    }

    /**
     * Finds user by username
     *
     * @param string $username
     * @return static|null
     */
    public static function findByUsername($username)
    {
        return Self::find()->where(['username'=>$username])->one();
    }

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->_id;
    }

    /**
     * {@inheritdoc}
     */
    public function getAuthKey()
    {
        return $this->salt;
    }

    /**
     * {@inheritdoc}
     */
    public function validateAuthKey($authKey)
    {
        return $this->salt === $authKey;
    }

    /**
     * 密码验证
     * @param type $password
     * @return type
     */
    public function validatePassword($password,$user) {
        $tPass = $user['salt'] . $password;
        return \Yii::$app->getSecurity()->validatePassword($tPass, $user['password']);
    }

    /**
     * 设置密码
     *
     * @param string $password
     */
    public function setPassword($password) {
        $tPass = $this->salt . $password;
        return \Yii::$app->getSecurity()->generatePasswordHash($tPass);
    }

    public function getRole(){
        return $this->hasOne(Role::className(),['_id'=>'role_id']);
   }
   
}
