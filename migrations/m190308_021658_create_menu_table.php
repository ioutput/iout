<?php

use yii\db\Migration;

/**
 * Handles the creation of table `menu`.
 */
class m190308_021658_create_menu_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('menu', [
            'id' => $this->primaryKey(),
            'name'=>$this->string(50)->notNull(),
            'url'=>$this->string(255)->notNull(),
            'status'=>$this->tinyinteger(1)->defaultValue(1),
            'is_menu'=>$this->tinyinteger(1)->defaultValue(1),
            'pid'=>$this->tinyinteger(1)->defaultValue(0),
            'sort'=>$this->integer(10)->defaultValue(100),
            'icon'=>$this->string(55)->notNull(),
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
        $this->dropTable('menu');
    }
}
