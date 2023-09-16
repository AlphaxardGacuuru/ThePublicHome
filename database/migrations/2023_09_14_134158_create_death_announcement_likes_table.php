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
        Schema::create('death_announcement_likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId("death_announcement_id")
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->timestamps();

			$table->unique(['user_id', 'death_announcement_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('death_announcement_likes');
    }
};
