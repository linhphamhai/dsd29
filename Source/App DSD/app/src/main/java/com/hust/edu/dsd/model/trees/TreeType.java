package com.hust.edu.dsd.model.trees;

/**
 * Created by tungts on 4/26/2018.
 */

public class TreeType {


    /**
     * type_id : 1
     * type_name : Sấu 2
     * standard_temperature : 250
     * standard_humidity : 800
     * standard_water : 0.5
     * state : 0
     */

    private int type_id;
    private String type_name;
    private int standard_temperature;
    private int standard_humidity;
    private double standard_water;
    private int state;

    public int getType_id() {
        return type_id;
    }

    public void setType_id(int type_id) {
        this.type_id = type_id;
    }

    public String getType_name() {
        return type_name;
    }

    public void setType_name(String type_name) {
        this.type_name = type_name;
    }

    public int getStandard_temperature() {
        return standard_temperature;
    }

    public void setStandard_temperature(int standard_temperature) {
        this.standard_temperature = standard_temperature;
    }

    public int getStandard_humidity() {
        return standard_humidity;
    }

    public void setStandard_humidity(int standard_humidity) {
        this.standard_humidity = standard_humidity;
    }

    public double getStandard_water() {
        return standard_water;
    }

    public void setStandard_water(double standard_water) {
        this.standard_water = standard_water;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }
}
