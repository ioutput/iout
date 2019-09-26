<?php

use yii\db\Migration;

/**
 * Handles the creation of table `user_log`.
 */
class m190308_021642_create_user_log_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('user_log', [
            'id' => $this->primaryKey(),
            'sn'=>$this->string(32)->notNull()->unique(),
            'user_id'=>$this->integer()->defaultValue(0),
            'ip'=>$this->string(32)->notNull(),
            'operation'=>$this->string(32)->notNull(),
            'created_at'=>$this->timestamp(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('user_log');
    }
}
