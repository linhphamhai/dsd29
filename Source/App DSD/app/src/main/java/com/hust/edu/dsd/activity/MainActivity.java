package com.hust.edu.dsd.activity;

import android.content.Intent;
import android.os.Handler;
import android.support.annotation.NonNull;
import android.support.design.widget.NavigationView;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.widget.SearchView;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;

import com.hust.edu.dsd.AccountUtil;
import com.hust.edu.dsd.BaseActivity;
import com.hust.edu.dsd.R;
import com.hust.edu.dsd.fragment.AccountFragment;
import com.hust.edu.dsd.fragment.HistoryWorkFragment;
import com.hust.edu.dsd.fragment.HomeFragmnet;

public class MainActivity extends BaseActivity implements NavigationView.OnNavigationItemSelectedListener, SearchView.OnQueryTextListener {

    Toolbar toolbar;
    private DrawerLayout drawer;
    private ActionBarDrawerToggle drawerToggle;
    NavigationView navigationView;

    SearchView searchView;

    @Override
    public int getLayoutResourceId() {
        return R.layout.activity_main;
    }

    @Override
    protected void addControls() {
        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        setTitle("DSD-29");

        drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
        changeFragment(HomeFragmnet.newInstance());

    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        drawer.closeDrawer(GravityCompat.START);
        closeSearchView();
        hideKeyboard();
        int id = item.getItemId();
        switch (id){
            case R.id.menu_navi_home:
                changeFragment(HomeFragmnet.newInstance());
                break;
            case R.id.menu_navi_account:
                changeFragment(AccountFragment.newInstance());
                break;
            case R.id.menu_navi_history_work:
                if (AccountUtil.getInstance(this).isVolunteer()){
                    showAlert("Thông báo","Chỉ nhân viên mới có thể xem được chức năng này.");
                    return false;
                }
                changeFragment(HistoryWorkFragment.newInstance());
                break;
            case R.id.menu_navi_map:
                if (AccountUtil.getInstance(this).isVolunteer()){
                    showAlert("Thông báo","Chỉ nhân viên mới có thể xem được chức năng này.");
                    return false;
                }
                new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        startActivity(new Intent(MainActivity.this, MapActivity.class));
                        overridePendingTransition(android.R.anim.fade_in,android.R.anim.fade_out);
                    }
                },1000);
                break;
            case R.id.menu_navi_tutorials:
                break;
        }
        return true;
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.search_view, menu);
        MenuItem itemSearch = menu.findItem(R.id.search_view);
        searchView = (SearchView) itemSearch.getActionView();
        //set OnQueryTextListener cho search view để thực hiện search theo text
        searchView.setOnQueryTextListener(this);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        return super.onOptionsItemSelected(item);
    }

    Handler handler = new Handler();
    private void changeFragment(final Fragment fragment){
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                FragmentManager fragmentManager = getSupportFragmentManager();
                FragmentTransaction ft = fragmentManager.beginTransaction();
                ft.setCustomAnimations(R.anim.fade_in,0);
                ft.replace(R.id.content_main, fragment).commit();
            }
        };
        handler.postDelayed(runnable,300);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        AccountUtil.getInstance(this).logout();
        finish();
    }

    private SearchTrees onSearch;
    public void setOnSearch(SearchTrees onSearch) {
        this.onSearch = onSearch;
    }
    public interface SearchTrees{
        void search(String key);
    }

    public void closeSearchView(){
        searchView.setIconified(true);
    }

    @Override
    public boolean onQueryTextSubmit(String query) {
        if (onSearch != null){
            onSearch.search(query);
        }
        return false;
    }

    @Override
    public boolean onQueryTextChange(String newText) {
        if (onSearch != null){
            onSearch.search(newText);
        }
        return false;
    }

}
