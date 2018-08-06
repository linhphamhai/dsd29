package com.hust.edu.dsd.fragment;

import android.content.Intent;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

import com.hust.edu.dsd.R;
import com.hust.edu.dsd.activity.MainActivity;
import com.hust.edu.dsd.adapter.InforTreeAdapter;
import com.hust.edu.dsd.adapter.TreeTypeSpinerAdapter;
import com.hust.edu.dsd.internet.api.ApiFactory;
import com.hust.edu.dsd.internet.api.BaseCallBack;
import com.hust.edu.dsd.chart.ChartActivity;
import com.hust.edu.dsd.interfaces.RecycleViewItemClick;
import com.hust.edu.dsd.model.trees.TreeType;
import com.hust.edu.dsd.model.trees.Trees;

import java.util.ArrayList;

/**
 * Created by tungts on 3/13/2018.
 */

public class HomeFragmnet extends BaseFragment implements MainActivity.SearchTrees, AdapterView.OnItemSelectedListener {

    RecyclerView rcv_list_trees;
    InforTreeAdapter inforTreeAdapter;
    ArrayList<Trees> listTrees = new ArrayList<>();

    Spinner spinner_tree_type;
    ArrayList<TreeType> listTreesType = new ArrayList<>();

    public static HomeFragmnet newInstance(){
        HomeFragmnet homeFragmnet = new HomeFragmnet();
        return homeFragmnet;
    }

    @Override
    public int getLayoutResource() {
        return R.layout.fragment_home;
    }

    @Override
    protected void addControls() {
        coppyTrees = new ArrayList<>();
        innitSpinner();
        ApiFactory.getApiHust().getAllTrees().enqueue(new BaseCallBack<ArrayList<Trees>>(getActivity()) {
            @Override
            public void onSuccess(ArrayList<Trees> result) {
                listTrees.addAll(result);
                coppyTrees.addAll(listTrees);
                innitRecycleViewTrees();
                spinner_tree_type.setOnItemSelectedListener(HomeFragmnet.this);
            }
        });
        ((MainActivity)getActivity()).setOnSearch(this);
    }

    private void innitSpinner() {
        spinner_tree_type = (Spinner) getView(R.id.spinner_tree_type);
        ApiFactory.getApiHust().getAllTreeType().enqueue(new BaseCallBack<ArrayList<TreeType>>(getActivity()) {
            @Override
            public void onSuccess(ArrayList<TreeType> result) {
                listTreesType.add(new TreeType());
                listTreesType.addAll(result);
                TreeTypeSpinerAdapter arrayAdapter = new TreeTypeSpinerAdapter(getActivity(),R.layout.item_spiner_tree_type, listTreesType);
                spinner_tree_type.setAdapter(arrayAdapter);
            }
        });
    }

    private void innitRecycleViewTrees() {
        rcv_list_trees = (RecyclerView) getView(R.id.rcv_list_trees);
        inforTreeAdapter = new InforTreeAdapter(getContext(),listTrees);
        rcv_list_trees.setAdapter(inforTreeAdapter);
        rcv_list_trees.setLayoutManager(new LinearLayoutManager(getContext()));
        inforTreeAdapter.setOnRecycleViewItemClick(new RecycleViewItemClick() {
            @Override
            public void onClick(int pos) {
                hideKeyboard();
                ((MainActivity)getActivity()).closeSearchView();
                Intent intent = new Intent(getActivity(), ChartActivity.class);
                intent.putExtra("TREE_ID", listTrees.get(pos).getTree_id());
                startActivity(intent);
                getActivity().overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out);
            }
        });
    }

    @Override
    public void search(String key) {
        fillter(key);
    }

    ArrayList<Trees> coppyTrees;
    private void fillter(String key) {
        listTrees.clear();
        if (key == null){
            listTrees.addAll(coppyTrees);
            inforTreeAdapter.notifyDataSetChanged();
            return;
        }

        for (Trees trees: coppyTrees){
            if (trees.getTree_name().toLowerCase().contains(key.toLowerCase())){
                listTrees.add(trees);
            }
        }
        inforTreeAdapter.notifyDataSetChanged();
    }

    @Override
    public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
        listTrees.clear();
        if (i == 0) {
            listTrees.addAll(coppyTrees);
            inforTreeAdapter.notifyDataSetChanged();
            return;
        }
        getTreesByTypeId(listTreesType.get(i).getType_id());
    }

    private void getTreesByTypeId(int type_id) {
        ApiFactory.getApiHust().getAllTreeByTypeId(type_id).enqueue(new BaseCallBack<ArrayList<Trees>>(getActivity()) {
            @Override
            public void onSuccess(ArrayList<Trees> result) {
                listTrees.addAll(result);
                inforTreeAdapter.notifyDataSetChanged();
            }
        });
    }

    @Override
    public void onNothingSelected(AdapterView<?> adapterView) {

    }
}
