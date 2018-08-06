package com.hust.edu.dsd.chart;

import android.widget.TextView;

import com.hust.edu.dsd.R;
import com.hust.edu.dsd.fragment.BaseFragment;

/**
 * Created by tungts on 4/13/2018.
 */

public class HumTreesFragment extends BaseFragment {

    CustomLineChart chart;
    TextView tv_title;

    public static HumTreesFragment newInstance(){
        HumTreesFragment humTreesFragment = new HumTreesFragment();
        return humTreesFragment;
    }

    @Override
    public int getLayoutResource() {
        return R.layout.fragment_chart_trees;
    }

    @Override
    protected void addControls() {
        chart = (CustomLineChart) getView(R.id.chart);
        tv_title = (TextView) getView(R.id.tv_title);
        tv_title.setText("Độ ẩm (%)");
        if (((ChartActivity)getActivity()).getDataSensor() != null) chart.setDataSensors(0, ((ChartActivity)getActivity()).getDataSensor());
    }
}
