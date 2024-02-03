<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deaths', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('membership_id')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('locale')->nullable();
            $table->string('name');
            $table->string('sunrise')->nullable();
            $table->string('sunset')->nullable();
            $table->string('burial_date')->nullable();
            $table->string('announcement');
            $table->string('poster')->nullable();
            $table->jsonb('photos')->nullable();
            $table->jsonb('videos')->nullable();
            $table->string('eulogy')->nullable();
            $table->string('recap')->nullable();
            $table->integer('likes')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deaths');
    }
};
