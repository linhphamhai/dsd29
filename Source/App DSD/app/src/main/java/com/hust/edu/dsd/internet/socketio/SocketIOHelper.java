package com.hust.edu.dsd.internet.socketio;

import android.app.Activity;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;
import com.google.gson.Gson;
import com.hust.edu.dsd.internet.api.ConfigApi;

import org.json.JSONArray;

import java.net.URISyntaxException;

/**
 * Created by tungts on 4/10/2018.
 */

public class SocketIOHelper {

    private static SocketIOHelper instance;
    private Activity activity;
    private SocketIOHelper(){}

    public static SocketIOHelper getInstance(Activity activity){
        if (instance == null){
            instance = new SocketIOHelper();
        }
        instance.activity = activity;
        return instance;
    }

    private Socket mSocket;
    {
        try {
            mSocket = IO.socket(ConfigApi.URL_NODEJS);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

    public void connect(){
        mSocket.connect();
    }

    public void disConnect(){
        mSocket.disconnect();
    }

    //send location
    public void sendCurrentLocation(int currentX, int currentY){
        CurrentLocation.getInstance().setX(currentX);
        CurrentLocation.getInstance().setY(currentY);
        mSocket.emit("walk", new Gson().toJson(CurrentLocation.getInstance())).toString();
    }

    public void onCurrentLocation(){
        mSocket.on("location-change", new Emitter.Listener() {
            @Override
            public void call(final Object... args) {
                activity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        JSONArray data = (JSONArray) args[0];
                        if (onCurrentLocation != null){
                            onCurrentLocation.OnChangeLocation(data);
                        }
                    }
                });
            }
        });
    }

    public void setOnCurrentLocation(OnCurrentLocation onCurrentLocation) {
        this.onCurrentLocation = onCurrentLocation;
    }

    private OnCurrentLocation onCurrentLocation;

    public interface OnCurrentLocation{
        void OnChangeLocation(JSONArray data);
    }

    ///lang nghe event cay cap nhat da dc tuoi
    public void updateTree(){
        mSocket.on("tree-change", new Emitter.Listener() {
            @Override
            public void call(final Object... args) {
                activity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        JSONArray data = (JSONArray) args[0];
                        if (onUpdateTrees != null){
                            onUpdateTrees.onUpdate(data);
                        }
                    }
                });
            }
        });
    }

    public void setOnUpdateTrees(UpdateTrees onUpdateTrees) {
        this.onUpdateTrees = onUpdateTrees;
    }

    private UpdateTrees onUpdateTrees;

    public interface UpdateTrees{
        void onUpdate(JSONArray data);
    }
    /// cay do sensor cap nhat

}
