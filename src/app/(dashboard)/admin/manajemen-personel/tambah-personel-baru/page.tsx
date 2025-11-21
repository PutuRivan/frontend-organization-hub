'use client'

import PersonnelForm from '@/components/dashboard/admin/manajemen-personel/tambah-personel-baru/personnel-form'
import HeaderContent from '@/components/dashboard/base/header-content'
import { Card } from '@/components/ui/card'

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-5">
      <HeaderContent
        title='Tambah Personel'
        description='Lengkapi data personel berikut untuk menambahkan ke sistem.' />
      <Card className='mt-3 p-3'>
        <PersonnelForm />
      </Card>
    </main>
  )
}
