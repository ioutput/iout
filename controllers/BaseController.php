<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBearerAuth;
class BaseController extends ActiveController
{   
    const EVENT_SAVE_LOG = 'save_log';
    public function init(){
   
        $this->response = \Yii::$app->response;
         \Yii::$app->user->enableSession = false;
        $this->on(self::EVENT_SAVE_LOG,['app\models\UserLog','saveLog']);
        
    }
    public function behaviors()
    {
          return ArrayHelper::merge([
                [
                        'class' => Cors::className(),
                        'cors' => [
                            'Origin' => ['*'],
                            'Access-Control-Request-Method' => ['GET','POST','DELETE','OPTIONS','PUT'],
                            'Access-Control-Request-Headers'=>['*']
                        ],
                        
                ],
                'authenticator' =>[
                            'class' => CompositeAuth::className(),
                            'authMethods' => [
                                HttpBearerAuth::className(),
                            ],
                            'optional'  => [ 'login'],

                ]
        ], parent::behaviors());
    }
    
    

}
