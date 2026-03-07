package com.yuzhi.hotel.domain;

import com.yuzhi.system.general.annotation.Excel;
import com.yuzhi.system.general.core.domain.BaseEntity;
import lombok.*;

/**
 * 入住登记对象 checkin
 *
 * @author yuzhi
 * @date 2026-03-07
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Checkin extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 入住ID */
    private String checkinId;

    /** 订单ID */
    @Excel(name = "订单ID")
    private String orderId;

    /** 房间ID */
    @Excel(name = "房间ID")
    private String roomId;

    /** 姓名 */
    @Excel(name = "姓名")
    private String name;

    /** 性别 */
    @Excel(name = "性别")
    private String gender;

    /** 电话号码 */
    @Excel(name = "电话号码")
    private String phone;


}
