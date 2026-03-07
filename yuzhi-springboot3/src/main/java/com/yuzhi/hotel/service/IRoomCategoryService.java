package com.yuzhi.hotel.service;

import java.util.List;
import com.yuzhi.hotel.domain.RoomCategory;
import com.yuzhi.system.general.core.domain.AjaxResult;

/**
 * 房间分类Service接口
 *
 * @author yuzhi
 * @date 2026-01-20
 */
public interface IRoomCategoryService
{
    /**
     * 查询房间分类
     *
     * @param roomCategoryId 房间分类主键
     * @return 房间分类
     */
    public RoomCategory selectRoomCategoryByRoomCategoryId(String roomCategoryId);

    /**
     * 查询房间分类列表
     *
     * @param roomCategory 房间分类
     * @return 房间分类集合
     */
    public List<RoomCategory> selectRoomCategoryList(RoomCategory roomCategory);

    /**
     * 新增房间分类
     *
     * @param roomCategory 房间分类
     * @return 结果
     */
    public int insertRoomCategory(RoomCategory roomCategory);

    /**
     * 批量新增房间分类
     *
     * @param roomCategorys 房间分类List
     * @return 结果
     */
    public int batchInsertRoomCategory(List<RoomCategory> roomCategorys);

    /**
     * 修改房间分类
     *
     * @param roomCategory 房间分类
     * @return 结果
     */
    public int updateRoomCategory(RoomCategory roomCategory);

    /**
     * 批量删除房间分类
     *
     * @param roomCategoryIds 需要删除的房间分类主键集合
     * @return 结果
     */
    public int deleteRoomCategoryByRoomCategoryIds(String[] roomCategoryIds);

    /**
     * 删除房间分类信息
     *
     * @param roomCategoryId 房间分类主键
     * @return 结果
     */
    public int deleteRoomCategoryByRoomCategoryId(String roomCategoryId);

    /**
     * 不分页查询房间类型列表
     * @return 房间类型列表
     */
    List<RoomCategory> selectRoomCategoryAllList();
}
