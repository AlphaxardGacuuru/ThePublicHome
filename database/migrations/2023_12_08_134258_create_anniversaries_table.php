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
        Schema::create('anniversaries', function (Blueprint $table) {
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
            $table->string('title');
            $table->longText('announcement');
            $table->string('venue')->nullable();
            $table->timestamp('anniversary_date')->nullable();
            $table->string('poster')->nullable();
            $table->jsonb('photos')->nullable();
            $table->jsonb('videos')->nullable();
            $table->string('recap')->nullable();
			$table->integer('likes')->default(0);
            $table->integer('comments')->default(0);
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
        Schema::dropIfExists('anniversaries');
    }
};
