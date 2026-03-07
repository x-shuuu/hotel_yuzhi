package com.yuzhi.hotel.domain;

import com.yuzhi.system.general.annotation.Excel;
import com.yuzhi.system.general.core.domain.BaseEntity;
import lombok.*;

/**
 * 房间对象 room
 *
 * @author yuzhi
 * @date 2026-02-24
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Room extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 房间ID */
    private String roomId;

    /** 房间号 */
    @Excel(name = "房间号")
    private String roomNumber;

    /** 房间分类ID */
    @Excel(name = "房间分类ID")
    private String categoryId;

    /** 房间状态（仅导出） */
    @Excel(name = "房间状态",type = Excel.Type.EXPORT)
    private String status;

    /** 房间分类 */
    @Excel(name = "房间分类")
    private String name;
}
