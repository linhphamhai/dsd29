package com.hust.edu.dsd.internet.socketio;

import com.hust.edu.dsd.model.staff.Staff;

/**
 * Created by tungts on 4/10/2018.
 */

public class CurrentLocation {

    private String socketId;
    private int staff_id;
    private int x;
    private int y;
    private String staff_name;

    private static CurrentLocation instance;
    private CurrentLocation(){}

    public static CurrentLocation getInstance(){
        if (instance == null){
            instance = new CurrentLocation();
        }
        return instance;
    }

    public void innitData(Staff staff, boolean isVolunteer){
        staff_id = !isVolunteer ? staff.getStaff_id() : 0;
        staff_name = staff.getStaff_name();
        x = 1;
        y = 2;
    }

    public String getSocketId() {
        return socketId;
    }

    public void setSocketId(String socketId) {
        this.socketId = socketId;
    }

    public int getId_staff() {
        return staff_id;
    }

    public void setId_staff(int id_staff) {
        this.staff_id = id_staff;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public String getStaff_name() {
        return staff_name;
    }

    public void setStaff_name(String staff_name) {
        this.staff_name = staff_name;
    }
}
