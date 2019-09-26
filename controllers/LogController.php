<?php

namespace app\controllers;

use Yii;
use app\models\UserLog;
class LogController extends BaseController
{   
    
    public function actions()
    {
        $action= parent::actions(); // TODO: Change the autogenerated stub
        unset($action['index'],$action['create'],$action['update'],$action['view'],$action['delete']);
        return $action;
    }
    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex()
    {   
        return UserLog::list(Yii::$app->request->queryParams);
    }

   

}
