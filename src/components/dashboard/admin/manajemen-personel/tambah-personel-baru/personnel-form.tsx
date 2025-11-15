'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { FileUpload } from './file-upload'

interface FormData {
  nama_lengkap: string
  nrp_id: string
  jabatan: string
  divisi: string
  nomor_telepon: string
  email: string
  alamat: string
  status_aktif: boolean
  foto: File | null
}

export function PersonnelForm() {
  const [formData, setFormData] = useState<FormData>({
    nama_lengkap: '',
    nrp_id: '',
    jabatan: '',
    divisi: '',
    nomor_telepon: '',
    email: '',
    alamat: '',
    status_aktif: true,
    foto: null,
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!formData.nama_lengkap.trim()) newErrors.nama_lengkap = 'Nama lengkap harus diisi'
    if (!formData.nrp_id.trim()) newErrors.nrp_id = 'NRP / ID harus diisi'
    if (!formData.jabatan) newErrors.jabatan = 'Jabatan harus dipilih'
    if (!formData.divisi) newErrors.divisi = 'Divisi harus dipilih'
    if (!formData.nomor_telepon.trim()) newErrors.nomor_telepon = 'Nomor telepon harus diisi'
    if (!formData.email.trim()) newErrors.email = 'Email harus diisi'
    else if (!validateEmail(formData.email)) newErrors.email = 'Format email tidak valid'
    if (!formData.alamat.trim()) newErrors.alamat = 'Alamat harus diisi'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleFileUpload = (file: File) => setFormData(prev => ({ ...prev, foto: file }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) console.log('Form submitted:', formData)
  }

  const handleReset = () => {
    setFormData({
      nama_lengkap: '',
      nrp_id: '',
      jabatan: '',
      divisi: '',
      nomor_telepon: '',
      email: '',
      alamat: '',
      status_aktif: true,
      foto: null,
    })
    setErrors({})
  }

  return (
    <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Tambah Personel</h1>
        <p className="text-muted-foreground">Lengkapi data personel berikut untuk menambahkan ke sistem.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-4 sm:p-6 space-y-6 w-full">
        {/* Data Pribadi */}
        <section className="space-y-4">
          <div>
            <Label htmlFor="nama_lengkap">Nama Lengkap</Label>
            <Input id="nama_lengkap" name="nama_lengkap" value={formData.nama_lengkap} onChange={handleInputChange} className="mt-2" />
            {errors.nama_lengkap && <p className="text-destructive text-sm mt-1">{errors.nama_lengkap}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nrp_id">NRP / ID Personel</Label>
              <Input id="nrp_id" name="nrp_id" value={formData.nrp_id} onChange={handleInputChange} className="mt-2" />
              {errors.nrp_id && <p className="text-destructive text-sm mt-1">{errors.nrp_id}</p>}
            </div>
            <div>
              <Label htmlFor="jabatan">Jabatan</Label>
              <Select value={formData.jabatan} onValueChange={v => handleSelectChange('jabatan', v)}>
                <SelectTrigger id="jabatan" className="mt-2">
                  <SelectValue placeholder="Pilih jabatan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="intern">Intern</SelectItem>
                </SelectContent>
              </Select>
              {errors.jabatan && <p className="text-destructive text-sm mt-1">{errors.jabatan}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="divisi">Divisi / Satuan</Label>
              <Select value={formData.divisi} onValueChange={v => handleSelectChange('divisi', v)}>
                <SelectTrigger id="divisi" className="mt-2">
                  <SelectValue placeholder="Pilih divisi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectContent>
              </Select>
              {errors.divisi && <p className="text-destructive text-sm mt-1">{errors.divisi}</p>}
            </div>
            <div>
              <Label htmlFor="nomor_telepon">Nomor Telepon</Label>
              <Input id="nomor_telepon" name="nomor_telepon" value={formData.nomor_telepon} onChange={handleInputChange} className="mt-2" />
              {errors.nomor_telepon && <p className="text-destructive text-sm mt-1">{errors.nomor_telepon}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-2" />
            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="alamat">Alamat</Label>
            <Textarea id="alamat" name="alamat" value={formData.alamat} onChange={handleInputChange} className="mt-2 resize-none" rows={4} />
            {errors.alamat && <p className="text-destructive text-sm mt-1">{errors.alamat}</p>}
          </div>
        </section>

        {/* Foto Personel */}
        <section>
          <Label>Upload Foto Personel</Label>
          <FileUpload onFileUpload={handleFileUpload} />
          {formData.foto && <p className="text-sm text-muted-foreground mt-2">File terpilih: {formData.foto.name}</p>}
        </section>

        {/* Status */}
        <section className="flex items-center justify-between py-4 border-t border-border">
          <Label htmlFor="status_aktif">Status Aktif</Label>
          <Switch id="status_aktif" checked={formData.status_aktif} onCheckedChange={checked => setFormData(prev => ({ ...prev, status_aktif: checked }))} />
        </section>

        {/* Buttons */}
        <section className="flex flex-wrap gap-4 justify-end pt-4">
          <Button type="button" variant="outline" onClick={handleReset} className="px-6 sm:px-8">Batal</Button>
          <Button type="submit" className="px-6 sm:px-8 bg-blue-600 hover:bg-blue-700 text-white">Simpan</Button>
        </section>
      </form>
    </div>
  )
}
