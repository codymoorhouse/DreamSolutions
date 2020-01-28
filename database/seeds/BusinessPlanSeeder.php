<?php

use Illuminate\Database\Seeder;

class BusinessPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('business_plans')->insert(array(

            array(
                'start' => Carbon\Carbon::createFromDate(2014, 1, 1, 'America/Edmonton'),
                'end' => Carbon\Carbon::createFromDate(2016, 12, 31, 'America/Edmonton'))
        ));
    }
}
