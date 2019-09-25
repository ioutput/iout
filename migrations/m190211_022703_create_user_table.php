<?php

use yii\db\Migration;

/**
 * Handles the creation of table `user`.
 */
class m190211_022703_create_user_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('user', [
            'id' => $this->primaryKey(),
            'username'=>$this->string(15)->notNull()->unique(),
            'password'=>$this->string(64)->notNull(),
            'salt'=>$this->string(16)->notNull(),
            'role_id'=>$this->integer()->defaultValue(0),
            'status'=>$this->tinyinteger(1)->defaultValue(1),
            'salt'=>$this->string(16)->notNull(),
            'descs'=>$this->string(255)->notNull(),
            'deleted_at'=>$this->integer()->defaultValue(0),
            'created_at'=>$this->timestamp(),
            'updated_at'=>$this->timestamp(),
        ]);
        $this->insert('user', [
            'username' => 'admin',
            'password' => \Yii::$app->getSecurity()->generatePasswordHash('test123456'),
            'salt'=>'test',
            'status'=>1,
            'created_at'=>date('Y-m-d H:i:s',time())
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('user');
    }
}
