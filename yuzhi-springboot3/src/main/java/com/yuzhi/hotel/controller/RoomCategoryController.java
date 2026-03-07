package com.yuzhi.hotel.controller;

import java.util.List;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.yuzhi.system.general.core.controller.BaseController;
import com.yuzhi.system.general.core.domain.AjaxResult;

import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;
import com.yuzhi.hotel.domain.RoomCategory;
import com.yuzhi.hotel.service.IRoomCategoryService;
import com.yuzhi.system.general.utils.poi.ExcelUtil;
import com.yuzhi.system.general.core.page.TableDataInfo;

/**
 * 房间分类Controller
 *
 * @author yuzhi
 * @date 2026-01-20
 */
@RestController
@RequestMapping("/hotel/category")
public class RoomCategoryController extends BaseController {
    @Autowired
    private IRoomCategoryService roomCategoryService;

    /**
     * 查询房间分类列表
     */
    @GetMapping("/list")
    public TableDataInfo list(RoomCategory roomCategory) {
        startPage();
        List<RoomCategory> list = roomCategoryService.selectRoomCategoryList(roomCategory);
        return getDataTable(list);
    }

    /**
     * 导出房间分类列表
     */
    @PostMapping("/export")
    public void export(HttpServletResponse response, RoomCategory roomCategory) {
        List<RoomCategory> list = roomCategoryService.selectRoomCategoryList(roomCategory);
        ExcelUtil<RoomCategory> util = new ExcelUtil<RoomCategory>(RoomCategory. class);
        util.exportExcel(response, list, "房间分类数据");
    }

    /**
     * 下载模板
     */
    @PostMapping("/importTemplate")
    public void importTemplate(HttpServletResponse response) {
        ExcelUtil<RoomCategory> util = new ExcelUtil<RoomCategory>(RoomCategory. class);
        util.importTemplateExcel(response, "房间分类数据");
    }

    /**
     * 导入数据
     */
    @PostMapping("/importData")
    public AjaxResult importData(MultipartFile file) throws Exception {
        ExcelUtil<RoomCategory> util = new ExcelUtil<RoomCategory>(RoomCategory. class);
        InputStream inputStream = file.getInputStream();
        List<RoomCategory> list = util.importExcel(inputStream);
        inputStream.close();
        int count = roomCategoryService.batchInsertRoomCategory(list);
        return AjaxResult.success("导入成功" + count + "条信息！");
    }

    /**
     * 获取房间分类详细信息
     */
    @GetMapping(value = "/{roomCategoryId}")
    public AjaxResult getInfo(@PathVariable("roomCategoryId") String roomCategoryId) {
        return success(roomCategoryService.selectRoomCategoryByRoomCategoryId(roomCategoryId));
    }

    /**
     * 新增房间分类
     */
    @PostMapping
    public AjaxResult add(@RequestBody RoomCategory roomCategory) {
        return toAjax(roomCategoryService.insertRoomCategory(roomCategory));
    }

    /**
     * 修改房间分类
     */
    @PutMapping
    public AjaxResult edit(@RequestBody RoomCategory roomCategory) {
        return toAjax(roomCategoryService.updateRoomCategory(roomCategory));
    }

    /**
     * 删除房间分类
     */
    @DeleteMapping("/{roomCategoryIds}")
    public AjaxResult remove(@PathVariable String[] roomCategoryIds) {
        return toAjax(roomCategoryService.deleteRoomCategoryByRoomCategoryIds(roomCategoryIds));
    }

    /**
     * 不分页查询房间类型列表
     */
    @GetMapping("/selectCategoryAllList")
    public AjaxResult selectCategoryAllList() {
        return success(roomCategoryService.selectRoomCategoryAllList());
    }
}
