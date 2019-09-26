<?php

use yii\db\Migration;

/**
 * Handles the creation of table `role`.
 */
class m190308_021714_create_role_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('role', [
            'id' => $this->primaryKey(),
            'name'=>$this->string(50)->notNull(),
            'descs'=>$this->string(255)->notNull(),
            'status'=>$this->tinyinteger(1)->defaultValue(1),
            'menu_ids'=>$this->string(255)->notNull(),
            'remark'=>$this->string(255)->notNull(),
            'created_at'=>$this->timestamp(),
            'updated_at'=>$this->timestamp(),
            'deleted_at'=>$this->integer()->defaultValue(0),
            
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('role');
    }
}
