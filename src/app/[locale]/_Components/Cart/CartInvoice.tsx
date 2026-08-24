"use client"
import { faArrowRight, faShield, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CartInvoiceProps } from './cart.types'
import { useState } from 'react';
import PayUserCartInvoice from './PayUserCartInvoice';
import RemoveAllCart from './RemoveAllCart';
import { useTranslations } from 'next-intl';

export default function CartInvoice({ cartData }: CartInvoiceProps) {
    const t = useTranslations();
    const [coupon, setCoupon] = useState('');

    return (
        <div className="w-full lg:w-1/4 shrink-0 mt-3 lg:mt-0">
            {cartData.basketItems.length > 0 && <div className='mb-3 flex justify-end me-3'>
                <RemoveAllCart />
            </div>}

            <div className="bg-white border-2 border-border rounded-2xl p-5 flex flex-col gap-5">
                {/* Title */}
                <h3 className="text-foreground font-bold text-lg">
                    {t('CartInvoice.orderSummary')}
                </h3>

                {/* Items list */}
                <div className="flex flex-col gap-3">
                    {cartData.basketItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-2">
                            <span className="text-sm text-(--text-secondary) truncate flex-1">
                                {item.courseTitle}
                            </span>
                            <span className="text-sm font-semibold text-foreground shrink-0">
                                ${item.basePrice.toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Subtotal + Total */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-(--text-secondary)">{t('CartInvoice.subtotal')}</span>
                        <span className="text-sm text-foreground">
                            ${cartData.totalBasePrice.toFixed(2)}
                        </span>
                    </div>
                    {cartData.totalDiscountPrice > 0 && (
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-(--text-secondary)">{t('CartInvoice.discount')}</span>
                            <span className="text-sm font-semibold text-(--success)">
                                -${cartData.totalDiscountPrice.toFixed(2)}
                            </span>
                        </div>
                    )}
                    <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-foreground">{t('CartInvoice.total')}</span>
                        <span className="text-base font-bold text-(--primary-color)">
                            ${cartData.totalPrice.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Coupon */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            placeholder={t('CartInvoice.couponPlaceholder')}
                            className="INPUT_STYLE flex-1 py-2.5 px-4 rounded-full text-sm"
                        />
                        <button className="MAIN_BUTTON px-4 py-2.5 rounded-full shrink-0">
                            {t('CartInvoice.apply')}
                        </button>
                    </div>
                    <p className="text-xs text-(--text-muted) px-1">
                        {t('CartInvoice.couponHint', { code: 'LEARN10' })}
                    </p>
                </div>

                {/* Checkout */}
                <PayUserCartInvoice baskedId={cartData.id} />
                {/* Trust badges */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs text-(--text-secondary)">
                        <FontAwesomeIcon icon={faShield} className="text-(--primary-color) text-sm" />
                        {t('CartInvoice.moneyBackGuarantee')}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-(--text-secondary)">
                        <FontAwesomeIcon icon={faRotateLeft} className="text-(--primary-color) text-sm" />
                        {t('CartInvoice.lifetimeAccess')}
                    </div>
                </div>

            </div>
        </div>
    )
}