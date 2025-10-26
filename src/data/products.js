const base = (q = 80) => `?q=${q}&auto=format&fit=crop&w=1200&h=900`

const pics = {
  basket: `https://images.unsplash.com/photo-1617957849830-87d31f16c3a9${base()}`,
  fabric: `https://images.unsplash.com/photo-1601582585289-b9777a47c23b${base()}`,
  beads: `https://images.unsplash.com/photo-1617038260897-0b0291a2fe3a${base()}`,
  tea: `https://images.unsplash.com/photo-1517701604599-bb29b565090c${base()}`,
  spice: `https://images.unsplash.com/photo-1604908554007-0d4018e1ad33${base()}`,
  knife: `https://images.unsplash.com/photo-1604908177523-4721e2988e53${base()}`,
  drum: `https://images.unsplash.com/photo-1506807414325-40e2e66339c6${base()}`,
  painting: `https://images.unsplash.com/photo-1552799454-7d82c23e8a66${base()}`,
  mask: `https://images.unsplash.com/photo-1459908676235-d5f02a50184e${base()}`,
  rug: `https://images.unsplash.com/photo-1551847677-dc82d764e1d5${base()}`,
}

const categories = ['Handicraft','Textile','Jewelry','Food','Spice','Tool','Instrument','Art','Ceremony','Home']

const items = []

for (let i = 1; i <= 100; i++) {
  const c = categories[(i - 1) % categories.length]
  const imgKeys = Object.keys(pics)
  const img = pics[imgKeys[(i - 1) % imgKeys.length]]
  const nameBase = [
    'Tharu Handwoven Basket',
    'Madhubani Style Painting',
    'Traditional Beaded Necklace',
    'Organic Nepali Tea Blend',
    'Himalayan Spice Assortment',
    'Handloom Dhaka Fabric',
    'Wood Carved Ritual Mask',
    'Tharu Ceremonial Drum',
    'Artisan Carving Knife',
    'Heritage Wool Rug',
  ][(i - 1) % 10]

  items.push({
    id: i,
    name: `${nameBase} #${i}`,
    price: 500 + ((i * 73) % 4500),
    category: c,
    cultureTag: i % 2 === 0 ? 'Tharu' : 'Nepal',
    image: img,
  })
}

export default items
