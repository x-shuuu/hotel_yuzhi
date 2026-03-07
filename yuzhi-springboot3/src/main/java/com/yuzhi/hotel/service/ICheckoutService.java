package com.yuzhi.hotel.service;

import java.util.List;
import com.yuzhi.hotel.domain.Checkout;

/**
 * 退房记录Service接口
 *
 * @author yuzhi
 * @date 2026-03-07
 */
public interface ICheckoutService
{
    /**
     * 查询退房记录
     *
     * @param checkoutId 退房记录主键
     * @return 退房记录
     */
    public Checkout selectCheckoutByCheckoutId(String checkoutId);

    /**
     * 查询退房记录列表
     *
     * @param checkout 退房记录
     * @return 退房记录集合
     */
    public List<Checkout> selectCheckoutList(Checkout checkout);

    /**
     * 新增退房记录
     *
     * @param checkout 退房记录
     * @return 结果
     */
    public int insertCheckout(Checkout checkout);

    /**
     * 批量新增退房记录
     *
     * @param checkouts 退房记录List
     * @return 结果
     */
    public int batchInsertCheckout(List<Checkout> checkouts);

    /**
     * 修改退房记录
     *
     * @param checkout 退房记录
     * @return 结果
     */
    public int updateCheckout(Checkout checkout);

    /**
     * 批量删除退房记录
     *
     * @param checkoutIds 需要删除的退房记录主键集合
     * @return 结果
     */
    public int deleteCheckoutByCheckoutIds(String[] checkoutIds);

    /**
     * 删除退房记录信息
     *
     * @param checkoutId 退房记录主键
     * @return 结果
     */
    public int deleteCheckoutByCheckoutId(String checkoutId);
}
