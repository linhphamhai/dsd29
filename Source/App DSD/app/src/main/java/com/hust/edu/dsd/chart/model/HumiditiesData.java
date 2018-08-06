package com.hust.edu.dsd.chart.model;

import com.google.gson.annotations.SerializedName;

/**
 * Created by tungts on 4/13/2018.
 */

public class HumiditiesData {

    public HumiditiesData(String time, int humidity) {
        this.time = time;
        this.humidity = humidity;
    }

    /**
     * time : 23:33
     * humidity : 18
     */

    @SerializedName("time")
    private String time;
    private int humidity;

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getHumidity() {
        return humidity;
    }

    public void setHumidity(int humidity) {
        this.humidity = humidity;
    }

}
