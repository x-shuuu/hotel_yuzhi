package com.yuzhi.hotel.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Mapper;
import com.yuzhi.hotel.domain.RoomCategory;

/**
 * 房间分类Mapper接口
 *
 * @author yuzhi
 * @date 2026-01-20
 */
@Mapper
public interface RoomCategoryMapper
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
     * 修改房间分类
     *
     * @param roomCategory 房间分类
     * @return 结果
     */
    public int updateRoomCategory(RoomCategory roomCategory);

    /**
     * 删除房间分类
     *
     * @param roomCategoryId 房间分类主键
     * @return 结果
     */
    public int deleteRoomCategoryByRoomCategoryId(String roomCategoryId);

    /**
     * 批量删除房间分类
     *
     * @param roomCategoryIds 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteRoomCategoryByRoomCategoryIds(String[] roomCategoryIds);

    /**
     * 不分页查询房间类型列表
     * @return
     */
    List<RoomCategory> selectRoomCategoryAllList();

    /**
     * 根据房间分类名称查询房间分类ID
     * @return
     */
    String selectCategoryIdByName(String name);

    /**
     * 根据单个或多个房间名称批量查询分类ID
     */
    @MapKey("name")
    Map<String, Map<String, Object>> selectCategoryIdsByNames(List<String> roomNames);
}
