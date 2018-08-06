package com.hust.edu.dsd.chart;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;

import com.hust.edu.dsd.BaseActivity;
import com.hust.edu.dsd.R;
import com.hust.edu.dsd.internet.api.ApiFactory;
import com.hust.edu.dsd.internet.api.BaseCallBack;
import com.hust.edu.dsd.chart.model.DataSensor;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by tungts on 4/13/2018.
 */

public class ChartActivity extends BaseActivity {

    ViewPager view_pager_chart;
    DataSensor dataSensor;

    @Override
    public int getLayoutResourceId() {
        return R.layout.activity_chart;
    }

    @Override
    protected void addControls() {
        int tree_id = getIntent().getIntExtra("TREE_ID", -1);
        ApiFactory.getApiHust().getDateSensor(tree_id).enqueue(new BaseCallBack<DataSensor>(this) {
            @Override
            public void onSuccess(DataSensor result) {
                dataSensor = result;
                innitViewPager();
            }
        });
    }

    public DataSensor getDataSensor(){
        return this.dataSensor;
    }

    private void innitViewPager() {
        view_pager_chart = findViewById(R.id.view_pager_chart);
        ViewPagerAdapter viewPagerAdapter = new ViewPagerAdapter(getSupportFragmentManager());
        viewPagerAdapter.addFrag(TempTreesFragment.newInstance(),"Temp");
        viewPagerAdapter.addFrag(HumTreesFragment.newInstance(),"Hum");
        view_pager_chart.setAdapter(viewPagerAdapter);
    }

    class ViewPagerAdapter extends FragmentPagerAdapter {

        private final List<Fragment> mFragmentList = new ArrayList<>();
        private final List<String> mFragmentTitleList = new ArrayList<>();

        public ViewPagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int position) {
            return mFragmentList.get(position);
        }

        @Override
        public int getCount() {
            return mFragmentList.size();
        }

        @Override
        public CharSequence getPageTitle(int position) {
            return mFragmentTitleList.get(position);
        }

        @Override
        public int getItemPosition(Object object) {
            return POSITION_NONE;
        }

        public void addFrag(Fragment fragment, String title) {
            mFragmentList.add(fragment);
            mFragmentTitleList.add(title);
        }
    }

}
