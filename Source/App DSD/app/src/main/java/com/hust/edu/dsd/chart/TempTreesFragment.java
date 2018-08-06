package com.hust.edu.dsd.chart;

import android.widget.TextView;

import com.hust.edu.dsd.R;
import com.hust.edu.dsd.fragment.BaseFragment;


/**
 * Created by tungts on 4/13/2018.
 */

public class TempTreesFragment extends BaseFragment {

    CustomLineChart chart;
    TextView tv_title;

    public static TempTreesFragment newInstance(){
        TempTreesFragment tempTreesFragment = new TempTreesFragment();
        return tempTreesFragment;
    }

    @Override
    public int getLayoutResource() {
        return R.layout.fragment_chart_trees;
    }

    @Override
    protected void addControls() {
        chart = (CustomLineChart) getView(R.id.chart);
        tv_title = (TextView) getView(R.id.tv_title);
        tv_title.setText("Nhiệt độ (C)");
        if (((ChartActivity)getActivity()).getDataSensor() != null) chart.setDataSensors(1, ((ChartActivity)getActivity()).getDataSensor());
    }
}
