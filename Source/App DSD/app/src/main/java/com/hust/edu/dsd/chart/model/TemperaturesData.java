package com.hust.edu.dsd.chart.model;

import com.google.gson.annotations.SerializedName;

/**
 * Created by tungts on 4/13/2018.
 */

public class TemperaturesData {

    /**
     * time : 23:33
     * temperature : 17.5
     */

    @SerializedName("time")
    private String time;
    private double temperature;

    public TemperaturesData(String time, double temperature) {
        this.time = time;
        this.temperature = temperature;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

}
