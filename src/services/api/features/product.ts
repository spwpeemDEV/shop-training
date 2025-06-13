import { instance } from '../instance'
import { handleApiError } from '../helper'

export interface ProductType {
  id: number;
  name: string;
  price: number;
}

export interface Product {
  id: number
  title: string
  price: number
  image: string
  description: string
}

export default {

async getAll<TRes>(): Promise<TRes | undefined> {
  try {
    const response = await instance.get<TRes>('/products');
    return response.data;
  } catch (err) {
    handleApiError(err, 'getAll');
  }
},



  async getById<TRes>(id: string | number): Promise<TRes | undefined> {
    try {
      const response = await instance.get<TRes>(`/products/${id}`)  // /products/${id}
      return response.data
    } catch (err) {
      handleApiError(err, 'getById')
    }
  },

  // Fake Store API ไม่มี search endpoint โดยตรง
  // ถ้าจะ search ต้องดึงทั้งหมดมา แล้วกรองเองใน client
  async search<TRes>(keyword: string): Promise<TRes | undefined> {
    try {
      const response = await instance.get<TRes>('/products')
      // สมมติว่า TRes เป็น array ของ products
      const filtered = (response.data as any[]).filter(product =>
        product.title.toLowerCase().includes(keyword.toLowerCase())
      )
      return filtered as unknown as TRes
    } catch (err) {
      handleApiError(err, 'search')
    }
  },

  // POST /products ใน Fake Store API ใช้สร้างสินค้าใหม่
  async create<TBody, TRes>(body: TBody): Promise<TRes | undefined> {
    try {
      const response = await instance.post<TRes>('/products', body)
      return response.data
    } catch (err) {
      handleApiError(err, 'create')
    }
  },

  // Fake Store API ไม่มี endpoint upload image
  // ลบฟังก์ชันนี้ออก หรือทำเองใน server ของคุณ

  async update<TBody, TRes>(id: string | number, body: TBody): Promise<TRes | undefined> {
    try {
      const response = await instance.put<TRes>(`/products/${id}`, body)
      return response.data
    } catch (err) {
      handleApiError(err, 'update')
    }
  },

  async delete<TRes>(id: string | number): Promise<TRes | undefined> {
    try {
      const response = await instance.delete<TRes>(`/products/${id}`)
      return response.data
    } catch (err) {
      handleApiError(err, 'delete')
    }
  },

  // deleteByBody ไม่มีใน Fake Store API
  // อาจจะลบออก หรือเขียนใหม่ตาม API ของคุณเอง
}
