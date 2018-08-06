package com.hust.edu.dsd.internet;

import android.app.ActivityManager;
import android.app.ActivityManager.RunningTaskInfo;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.hust.edu.dsd.utils.Utils;

import java.util.List;

public class NetworkChangeReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, final Intent intent) {
        if (context == null)
            return;
        boolean existsContext = isRunning(context);
        if (existsContext)
            if (Utils.checkInternetConnection(context)) {
            } else {
            }
    }

    public boolean isRunning(Context ctx) {
        ActivityManager activityManager = (ActivityManager) ctx.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> runningAppProcesses = activityManager.getRunningAppProcesses();

        if (runningAppProcesses != null) {
            for (ActivityManager.RunningAppProcessInfo runningAppProcessInfo : runningAppProcesses) {
                try {
                    if (ctx.getPackageName().equalsIgnoreCase(runningAppProcessInfo.processName))
                        return true;
                } catch (Exception e){
                    e.printStackTrace();
                }
            }
        }

        return false;
    }
}
