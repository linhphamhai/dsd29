package com.hust.edu.dsd.chart;

import android.content.Context;
import android.graphics.Color;
import android.graphics.DashPathEffect;
import android.graphics.drawable.Drawable;
import android.support.v4.content.ContextCompat;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;

import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.components.AxisBase;
import com.github.mikephil.charting.components.Legend;
import com.github.mikephil.charting.components.XAxis;
import com.github.mikephil.charting.components.YAxis;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.github.mikephil.charting.formatter.IAxisValueFormatter;
import com.github.mikephil.charting.highlight.Highlight;
import com.github.mikephil.charting.interfaces.datasets.ILineDataSet;
import com.github.mikephil.charting.listener.ChartTouchListener;
import com.github.mikephil.charting.listener.OnChartGestureListener;
import com.github.mikephil.charting.listener.OnChartValueSelectedListener;
import com.github.mikephil.charting.utils.Utils;
import com.hust.edu.dsd.R;
import com.hust.edu.dsd.chart.model.DataSensor;
import com.hust.edu.dsd.chart.model.HumiditiesData;

import java.util.ArrayList;

/**
 * Created by tungts on 4/13/2018.
 */

public class CustomLineChart extends LineChart implements OnChartGestureListener, OnChartValueSelectedListener {

    Context context;
    DataSensor dataSensors;
    int type;

    public CustomLineChart(Context context) {
        super(context);
        this.context = context;
        innit();
    }

    public CustomLineChart(Context context, AttributeSet attrs) {
        super(context, attrs);
        this.context = context;
        innit();
    }

    public CustomLineChart(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        this.context = context;
        innit();
    }

    private void innit() {
        dataSensors = new DataSensor();
//        innitData();
        setUpChart();
        setUpXAxis();
        setUpYAxis();
        this.animateX(2500);
        Legend l = this.getLegend();
        l.setForm(Legend.LegendForm.LINE);
    }

    public void setDataSensors(int type,DataSensor dataSensor){
        this.type = type;
        this.dataSensors = dataSensor;
        setData();
    }

    private void innitData() {
        dataSensors.getHumidities().add(new HumiditiesData("23:33",18));
        dataSensors.getHumidities().add(new HumiditiesData("23:37",41));
        dataSensors.getHumidities().add(new HumiditiesData("23:41",30));
        dataSensors.getHumidities().add(new HumiditiesData("23:44",35));
        dataSensors.getHumidities().add(new HumiditiesData("23:45",75));
        dataSensors.getHumidities().add(new HumiditiesData("23:45",10));
        dataSensors.getHumidities().add(new HumiditiesData("23:33",49));
        dataSensors.getHumidities().add(new HumiditiesData("23:33",45));
        dataSensors.getHumidities().add(new HumiditiesData("23:33",8));
        dataSensors.getHumidities().add(new HumiditiesData("23:33",15));
    }

    private void setData() {
        ArrayList<Entry> values = new ArrayList<Entry>();
        if (type == 0){
            for (int i = 0; i < dataSensors.getHumidities().size(); i++){
                values.add(new Entry(i, dataSensors.getHumidities().get(i).getHumidity(), getResources().getDrawable(R.drawable.star)));
            }
        } else {
            for (int i = 0; i < dataSensors.getTemperatures().size(); i++){
                values.add(new Entry(i, (float) dataSensors.getTemperatures().get(i).getTemperature(), getResources().getDrawable(R.drawable.star)));
            }
        }


        LineDataSet set1;
        if (this.getData() != null && this.getData().getDataSetCount() > 0) {
            set1 = (LineDataSet)this.getData().getDataSetByIndex(0);
            set1.setValues(values);
            this.getData().notifyDataChanged();
            this.notifyDataSetChanged();

        } else {
            // create a dataset and give it a type
            set1 = new LineDataSet(values, "Nhiệt độ ");
            set1.setDrawIcons(false);

            // set the line to be drawn like this "- - - - - -"
            set1.enableDashedLine(10f, 0f, 0f);
            set1.enableDashedHighlightLine(10f, 0f, 0f);
            set1.setColor(Color.BLUE);
            set1.setCircleColor(Color.RED);
            set1.setLineWidth(1f);
            set1.setCircleRadius(1.5f);
            set1.setDrawCircleHole(false);
            set1.setValueTextSize(9f);
            set1.setDrawFilled(true);
            set1.setFormLineWidth(1f);
            set1.setFormLineDashEffect(new DashPathEffect(new float[]{10f, 5f}, 0f));
            set1.setFormSize(15.f);

            if (Utils.getSDKInt() >= 18) {
                // fill drawable only supported on api level 18 and above
                Drawable drawable = ContextCompat.getDrawable(context, R.drawable.fade_blue);
                set1.setFillDrawable(drawable);
            }
            else {
                set1.setFillColor(Color.BLACK);
            }

            ArrayList<ILineDataSet> dataSets = new ArrayList<ILineDataSet>();
            dataSets.add(set1); // add the datasets
            set1.setDrawValues(!set1.isDrawValuesEnabled());
            // create a data object with the datasets
            LineData data = new LineData(dataSets);

            // set data
            this.setData(data);
        }
    }

    private void setUpYAxis() {
        YAxis leftAxis = this.getAxisLeft();
        leftAxis.removeAllLimitLines(); // reset all limit lines to avoid overlapping lines
//        leftAxis.addLimitLine(ll1);
//        leftAxis.addLimitLine(ll2);
        leftAxis.setAxisMaximum(150f);
        leftAxis.setAxisMinimum(0f);
//        leftAxis.setDrawGridLines(false);
        //leftAxis.setYOffset(20f);
//        leftAxis.enableGridDashedLine(10f, 10f, 0f);
        leftAxis.setDrawZeroLine(false);
        this.getAxisRight().setEnabled(false);
    }

    private void setUpXAxis() {
        XAxis xAxis = this.getXAxis();
//        xAxis.enableGridDashedLine(10f, 10f, 0f);
        xAxis.setPosition(XAxis.XAxisPosition.BOTTOM);
//        xAxis.setDrawAxisLine(true);
        xAxis.setDrawGridLines(false);
        xAxis.setGranularity(1f); // only intervals of 5 minute
        xAxis.setValueFormatter(new IAxisValueFormatter() {
            @Override
            public String getFormattedValue(float value, AxisBase axis) {
                return dataSensors.getHumidities().get((int)value).getTime();
            }
        });
    }

    private void setUpChart() {
        this.setOnChartGestureListener(this);
        this.setOnChartValueSelectedListener(this);
        this.setDrawGridBackground(false);

        // no description text
        this.getDescription().setEnabled(false);

        // enable touch gestures
        this.setTouchEnabled(true);

        // enable scaling and dragging
        this.setDragEnabled(true);
        this.setScaleEnabled(true);
        // this.setScaleXEnabled(true);
        // this.setScaleYEnabled(true);

        // if disabled, scaling can be done on x- and y-axis separately
        this.setPinchZoom(false);

        // set an alternative background color
        // this.setBackgroundColor(Color.GRAY);

        // create a custom MarkerView (extend MarkerView) and specify the layout
        // to use for it
        MyMarkerView mv = new MyMarkerView(context, R.layout.custom_marker_view);
        mv.setChartView(this); // For bounds control
        this.setMarker(mv); // Set the marker to the char
    }

    @Override
    public void onChartGestureStart(MotionEvent me, ChartTouchListener.ChartGesture lastPerformedGesture) {
        Log.i("Gesture", "START, x: " + me.getX() + ", y: " + me.getY());
    }

    @Override
    public void onChartGestureEnd(MotionEvent me, ChartTouchListener.ChartGesture lastPerformedGesture) {
        Log.i("Gesture", "END, lastGesture: " + lastPerformedGesture);

        // un-highlight values after the gesture is finished and no single-tap
        if(lastPerformedGesture != ChartTouchListener.ChartGesture.SINGLE_TAP)
            this.highlightValues(null); // or highlightTouch(null) for callback to onNothingSelected(...)
    }

    @Override
    public void onChartLongPressed(MotionEvent me) {
        Log.i("LongPress", "ChartDemo longpressed.");
    }

    @Override
    public void onChartDoubleTapped(MotionEvent me) {
        Log.i("DoubleTap", "ChartDemo double-tapped.");
    }

    @Override
    public void onChartSingleTapped(MotionEvent me) {
        Log.i("SingleTap", "ChartDemo single-tapped.");
    }

    @Override
    public void onChartFling(MotionEvent me1, MotionEvent me2, float velocityX, float velocityY) {
        Log.i("Fling", "ChartDemo flinged. VeloX: " + velocityX + ", VeloY: " + velocityY);
    }

    @Override
    public void onChartScale(MotionEvent me, float scaleX, float scaleY) {
        Log.i("Scale / Zoom", "ScaleX: " + scaleX + ", ScaleY: " + scaleY);
    }

    @Override
    public void onChartTranslate(MotionEvent me, float dX, float dY) {
        Log.i("Translate / Move", "dX: " + dX + ", dY: " + dY);
    }

    @Override
    public void onValueSelected(Entry e, Highlight h) {
        Log.i("Entry selected", e.toString());
        Log.i("LOWHIGH", "low: " + this.getLowestVisibleX() + ", high: " + this.getHighestVisibleX());
        Log.i("MIN MAX", "xmin: " + this.getXChartMin() + ", xmax: " + this.getXChartMax() + ", ymin: " + this.getYChartMin() + ", ymax: " + this.getYChartMax());
    }

    @Override
    public void onNothingSelected() {
        Log.i("Nothing selected", "Nothing selected.");
    }
}
