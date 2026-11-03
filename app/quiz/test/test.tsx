
'use client'
import { useState } from "react";

export default function Filter() {
  let colorOpen = false
  const [priceOpen, setPriceOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);

  return (
    <div className="w-[280px] border-t border-b border-black">
        <h2 className="text-xl text-center font-bold  border-b">👕 카테고리 필터</h2>
      {/* 색상 */}
      <div className="border-b border-gray-200 pl-5">
        <button
          type="button"
          onClick={() => {colorOpen = !colorOpen; console.log(`colorOpen: ${colorOpen}`)}}
          className="flex w-full items-center justify-between py-5 text-left cursor-pointer hover:bg-blue-100"
        >
          <span className="text-sm font-semibold">색상 </span>
          <span>{colorOpen ? "−" : "+"}</span>
        </button>

        {colorOpen && (
          <div className="flex flex-col gap-3 pb-5">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" />
              블랙
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" />
              화이트
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" />
              블루
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" />
              레드
            </label>
          </div>
        )}
      </div>

      {/* 가격 */}
      <div className="border-b border-gray-200 pl-5">
        <button
          type="button"
          onClick={() => setPriceOpen(!priceOpen)}
          className="flex w-full items-center justify-between py-5 text-left cursor-pointer hover:bg-blue-100"
        >
          <span className="text-sm font-semibold">가격</span>
          <span>{priceOpen ? "−" : "+"}</span>
        </button>

        {priceOpen && (
          <div className="flex flex-col gap-3 pb-5">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" />
              30,000원 이하
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" />
              30,000원 - 50,000원
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" />
              50,000원 - 100,000원
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" />
              100,000원 이상
            </label>
          </div>
        )}
      </div>

      {/* 브랜드 */}
      <div className="border-b border-gray-200 pl-5">
        <button
          type="button"
          onClick={() => setBrandOpen(!brandOpen)}
          className="flex w-full items-center justify-between py-5 text-left cursor-pointer hover:bg-blue-100"
        >
          <span className="text-sm font-semibold">브랜드</span>
          <span>{brandOpen ? "−" : "+"}</span>
        </button>

        {brandOpen && (
          <div className="flex flex-col gap-3 pb-5">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" />
              Nike
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" />
              Adidas
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" />
              New Balance
            </label>
          </div>
        )}
      </div>

      {/* 사이즈 */}
      <div className="border-b border-gray-200 pl-5">
        <button
          type="button"
          onClick={() => setSizeOpen(!sizeOpen)}
          className="flex w-full items-center justify-between py-5 text-left cursor-pointer  hover:bg-blue-100"
        >
          <span className="text-sm font-semibold">사이즈</span>
          <span>{sizeOpen ? "−" : "+"}</span>
        </button>

        {sizeOpen && (
          <div className="flex flex-col gap-3 pb-5">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" />
              S
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" />
              M
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" />
              L
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" />
              XL
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

