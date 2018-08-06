package com.hust.edu.dsd.chart.model;

import com.google.gson.annotations.SerializedName;
import com.hust.edu.dsd.chart.model.HumiditiesData;
import com.hust.edu.dsd.chart.model.TemperaturesData;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by tungts on 4/11/2018.
 */

public class DataSensor {

    private ArrayList<HumiditiesData> humidities;
    private ArrayList<TemperaturesData> temperatures;

    public DataSensor() {
        humidities = new ArrayList<>();
        temperatures = new ArrayList<>();
    }

    public ArrayList<HumiditiesData> getHumidities() {
        return humidities;
    }

    public void setHumidities(ArrayList<HumiditiesData> humidities) {
        this.humidities = humidities;
    }

    public ArrayList<TemperaturesData> getTemperatures() {
        return temperatures;
    }

    public void setTemperatures(ArrayList<TemperaturesData> temperatures) {
        this.temperatures = temperatures;
    }
}
