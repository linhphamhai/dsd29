package com.hust.edu.dsd.internet.api;

import com.hust.edu.dsd.chart.model.DataSensor;
import com.hust.edu.dsd.model.Coodinator;
import com.hust.edu.dsd.model.trees.TreeType;
import com.hust.edu.dsd.model.trees.Trees;
import com.hust.edu.dsd.model.WaterAndTree;
import com.hust.edu.dsd.model.WaterStation;
import com.hust.edu.dsd.model.staff.HistoryWork;
import com.hust.edu.dsd.internet.socketio.CurrentLocation;

import java.util.ArrayList;

import okhttp3.MultipartBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.Query;

/**
 * Created by tungts on 3/13/2018.
 */

public interface ApiHust {

    //login
    @FormUrlEncoded
    @POST("/api/staff/login")
    Call<ResponseBody> login(@Field("username") String user,
                             @Field("password") String pass);

    ///get tree
    @GET("/api/tree/get-all")
    Call<ArrayList<Trees>> getAllTrees();

    //get tree by type id
    @GET("/api/tree/get-by-type")
    Call<ArrayList<Trees>> getAllTreeByTypeId(@Query("type_id") int type_id);

    //get all tree type
    @GET("/api/tree-type/get-all")
    Call<ArrayList<TreeType>> getAllTreeType();

    //get all tree to water
    @GET("/api/tree-and-water")
    Call<WaterAndTree> getWaterAndTree(@Query("x") int x,
                                       @Query("y") int y,
                                       @Query("max") int max);
    //cancel water tree
    @FormUrlEncoded
    @POST("/api/history-detail/cancel")
    Call<ResponseBody> cancelWaterTheTrees(@Field("tree_id") int tree_id);

    //report tree state include image
    @Multipart
    @POST("/api/mobile/update-tree-state")
    Call<ResponseBody> updateTreeState(@Part MultipartBody.Part file,
                                       @Part("tree_id") String tree_id,
                                       @Part("tree_state") String tree_state,
                                       @Part("tree_description") String tree_description);

    ///get all water-station
    @GET("/api/water-station/get-all")
    Call<ArrayList<WaterStation>> getAllWaterStation();

    //update tree water
    @Multipart
    @POST("/api/history-detail/create")
    Call<ResponseBody> waterTree(@Part("tree_id") int tree_id,
                     @Part("staff_id") int staff_id,
                     @Part("volume") double volume);

    //get nearest water station
    @GET("/api/nearest-water-station")
    Call<WaterStation> getNearest(@Query("x") int x,
                                  @Query("y") int y);

    //data sensor of tree
    @GET("/api/mobile-sensor-data")
    Call<DataSensor> getDateSensor(@Query("tree_id") int tree_id);

    //history work of staff
    @GET("/api/history-detail/get")
    Call<ArrayList<HistoryWork>> getHistoryWork(@Query("staff_id") int staff_id);

    // get all user online
    @GET("/api/online-user/get-all")
    Call<ArrayList<CurrentLocation>> getAllUserOnline();

    //get map json
    @GET("/api/map/get-map-json")
    Call<ArrayList<Coodinator>> getMap();



}
