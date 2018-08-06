package com.hust.edu.dsd.fragment.dialog;

import android.app.Dialog;
import android.app.DialogFragment;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.EditText;
import android.widget.TextView;

import com.hust.edu.dsd.AccountUtil;
import com.hust.edu.dsd.R;
import com.hust.edu.dsd.internet.api.ApiFactory;
import com.hust.edu.dsd.internet.api.BaseCallBack;
import com.hust.edu.dsd.model.trees.Trees;

import okhttp3.ResponseBody;

/**
 * Created by tungts on 4/12/2018.
 */

public class DialogWaterTrees extends DialogFragment {

    View root;
    EditText edt_volume;
    TextView tv_current_water;
    TextView btn_send;
    Trees trees;

    private WaterTreeListener onWaterTreeListener;

    public interface WaterTreeListener{
        void onSuccess(double volume);
    }

    public static DialogWaterTrees newInstance(Trees trees, WaterTreeListener onWaterTreeListener){
        DialogWaterTrees dialogWaterTrees = new DialogWaterTrees();
        dialogWaterTrees.trees = trees;
        dialogWaterTrees.onWaterTreeListener = onWaterTreeListener;
        return dialogWaterTrees;
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        Dialog dialog = super.onCreateDialog(savedInstanceState);
        dialog.getWindow().requestFeature(Window.FEATURE_NO_TITLE);
        dialog.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

        dialog.setCanceledOnTouchOutside(false);
        setStyle(STYLE_NO_FRAME, R.style.AppTheme_NoActionBar);
        WindowManager.LayoutParams lp = new WindowManager.LayoutParams();
        lp.copyFrom(dialog.getWindow().getAttributes());
        lp.gravity = Gravity.CENTER;
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        dialog.getWindow().setAttributes(lp);
        dialog.getWindow().setDimAmount(0.0f);
        dialog.getWindow().getAttributes().windowAnimations = R.anim.fade_in;

        setCancelable(true);
        return dialog;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.dialog_water_tree, container);    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        root = view;
        addControls(view);
    }

    private void addControls(View view) {
        edt_volume = view.findViewById(R.id.edt_volume);
        btn_send = view.findViewById(R.id.btn_send);
        tv_current_water = view.findViewById(R.id.tv_current_water);
        tv_current_water.setText("Lượng nước cần tưới: " + trees.getCurrent_water() + " lít");
        btn_send.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                waterTheTrees();
            }
        });
    }

    private void waterTheTrees() {
        if (edt_volume.getText().toString().isEmpty()) return;
        final double volume = Double.parseDouble(edt_volume.getText().toString());
        int staff_id = AccountUtil.getInstance(getActivity()).getStaff().getStaff_id();
        if (volume > 0 && volume <= trees.getCurrent_water()){
            ApiFactory.getApiHust().waterTree(trees.getTree_id(), staff_id, volume).enqueue(new BaseCallBack<ResponseBody>(getActivity()) {
                @Override
                public void onSuccess(ResponseBody result) {
                    if (onWaterTreeListener != null){
                        onWaterTreeListener.onSuccess(volume);
                        dismiss();
                    }
                }
            });
        }
    }

}
