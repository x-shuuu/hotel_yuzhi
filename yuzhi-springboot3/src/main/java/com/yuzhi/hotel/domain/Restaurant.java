package com.yuzhi.hotel.domain;

import java.util.List;
import com.yuzhi.system.general.annotation.Excel;
import com.yuzhi.system.general.core.domain.BaseEntity;
import lombok.*;

/**
 * 餐厅对象 restaurant
 *
 * @author yuzhi
 * @date 2026-03-07
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Restaurant extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 餐厅ID */
    private String restaurantId;

    /** 餐厅名称 */
    @Excel(name = "餐厅名称")
    private String name;

    /** 描述 */
    @Excel(name = "描述")
    private String description;

    /** 位置 */
    @Excel(name = "位置")
    private String location;

    /** 联系电话 */
    @Excel(name = "联系电话")
    private String phone;

    /** 特色 */
    @Excel(name = "特色")
    private String specialty;

    /** 图片 */
    @Excel(name = "图片")
    private String image;

    /** 菜单信息 */
    private List<Menu> menuList;


}
