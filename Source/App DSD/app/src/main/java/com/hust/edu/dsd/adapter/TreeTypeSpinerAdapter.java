package com.hust.edu.dsd.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.hust.edu.dsd.R;
import com.hust.edu.dsd.model.trees.TreeType;

import java.util.List;

/**
 * Created by tungts on 4/26/2018.
 */

public class TreeTypeSpinerAdapter extends BaseAdapter {

    Context context;
    int myLayout;
    List<TreeType> treeTypes;

    public TreeTypeSpinerAdapter(Context context, int myLayout, List<TreeType> treeTypes) {
        this.context = context;
        this.myLayout = myLayout;
        this.treeTypes = treeTypes;
    }

    @Override
    public int getCount() {
        return treeTypes.size();
    }

    @Override
    public Object getItem(int i) {
        return null;
    }

    @Override
    public long getItemId(int i) {
        return 0;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        view = inflater.inflate(myLayout, null);
        TextView tv = view.findViewById(R.id.tv_tree_type);
        if (i == 0){
            tv.setText("Tất cả");
            return view;
        }
        tv.setText(treeTypes.get(i).getType_name());
        return view;
    }

}
