"""
Constants for business registration: negeri, daerah, categories, revenue ranges.
Values aligned with common Malaysian administrative and business usage.
"""

# Malaysian states (Negeri)
NEGERI_CHOICES = [
    ('johor', 'Johor'),
    ('kedah', 'Kedah'),
    ('kelantan', 'Kelantan'),
    ('melaka', 'Melaka'),
    ('negeri_sembilan', 'Negeri Sembilan'),
    ('pahang', 'Pahang'),
    ('perak', 'Perak'),
    ('perlis', 'Perlis'),
    ('pulau_pinang', 'Pulau Pinang'),
    ('sabah', 'Sabah'),
    ('sarawak', 'Sarawak'),
    ('selangor', 'Selangor'),
    ('terengganu', 'Terengganu'),
    ('wp_kuala_lumpur', 'W.P. Kuala Lumpur'),
    ('wp_labuan', 'W.P. Labuan'),
    ('wp_putrajaya', 'W.P. Putrajaya'),
]

# Districts (Daerah) organized by State (Negeri)
DAERAH_BY_NEGERI = {
    'johor': [
        ('johor_bahru', 'Johor Bahru'),
        ('muar', 'Muar'),
        ('batupahat', 'Batu Pahat'),
        ('kulaijaya', 'Kulai'),
        ('pontian', 'Pontian'),
        ('kluang', 'Kluang'),
        ('mersing', 'Mersing'),
    ],
    'kedah': [
        ('alor_setar', 'Alor Setar'),
        ('sungai_petani', 'Sungai Petani'),
        ('kulim', 'Kulim'),
        ('jitra', 'Jitra'),
    ],
    'kelantan': [
        ('kota_bharu', 'Kota Bharu'),
        ('pasir_mas', 'Pasir Mas'),
        ('tanah_merah', 'Tanah Merah'),
    ],
    'melaka': [
        ('melaka_tengah', 'Melaka Tengah'),
        ('alor_gajah', 'Alor Gajah'),
        ('jasin', 'Jasin'),
    ],
    'negeri_sembilan': [
        ('seremban', 'Seremban'),
        ('port_dickson', 'Port Dickson'),
        ('kuala_pilah', 'Kuala Pilah'),
    ],
    'pahang': [
        ('kuantan', 'Kuantan'),
        ('temerloh', 'Temerloh'),
        ('raub', 'Raub'),
        ('bentong', 'Bentong'),
    ],
    'perak': [
        ('ipoh', 'Ipoh'),
        ('taiping', 'Taiping'),
        ('khota_setar', 'Kota Setar'),
        ('rawang', 'Rawang'),
    ],
    'perlis': [
        ('kangar', 'Kangar'),
        ('arau', 'Arau'),
    ],
    'pulau_pinang': [
        ('george_town', 'George Town'),
        ('seberang_perai', 'Seberang Perai'),
    ],
    'sabah': [
        ('kota_kinabalu', 'Kota Kinabalu'),
        ('sandakan', 'Sandakan'),
        ('tawau', 'Tawau'),
    ],
    'sarawak': [
        ('kuching', 'Kuching'),
        ('miri', 'Miri'),
        ('sibu', 'Sibu'),
    ],
    'selangor': [
        ('petaling', 'Petaling'),
        ('klang', 'Klang'),
        ('shah_alam', 'Shah Alam'),
        ('subang_jaya', 'Subang Jaya'),
    ],
    'terengganu': [
        ('kuala_terengganu', 'Kuala Terengganu'),
        ('kuantan', 'Kuantan'),
    ],
    'wp_kuala_lumpur': [
        ('kuala_lumpur', 'Kuala Lumpur'),
    ],
    'wp_labuan': [
        ('labuan', 'Labuan'),
    ],
    'wp_putrajaya': [
        ('putrajaya', 'Putrajaya'),
    ],
}

# Flat list of all daerah for backward compatibility
DAERAH_CHOICES = [
    item for sublist in DAERAH_BY_NEGERI.values() for item in sublist
] + [('other', 'Lain-lain')]

# Business categories (expand as needed)
BUSINESS_CATEGORY_CHOICES = [
    ('retail', 'Retail'),
    ('f_b', 'Food & Beverage'),
    ('services', 'Services'),
    ('ecommerce', 'E-commerce'),
    ('manufacturing', 'Manufacturing'),
    ('tech', 'Technology'),
    ('creative', 'Creative / Media'),
    ('education', 'Education'),
    ('health', 'Health & Wellness'),
    ('other', 'Other'),
]

# Sales channels (multi-select)
BUSINESS_CHANNEL_ECOM = 'ecommerce'
BUSINESS_CHANNEL_SOCIAL = 'social_media'
BUSINESS_CHANNEL_PHYSICAL = 'physical_store'

BUSINESS_CHANNEL_CHOICES = [
    (BUSINESS_CHANNEL_ECOM, 'E-commerce'),
    (BUSINESS_CHANNEL_SOCIAL, 'Social Media'),
    (BUSINESS_CHANNEL_PHYSICAL, 'Physical Store'),
]

# Monthly revenue range (dropdown)
MONTHLY_REVENUE_RANGE_CHOICES = [
    ('under_1k', 'Under RM 1,000'),
    ('1k_5k', 'RM 1,000 - RM 5,000'),
    ('5k_10k', 'RM 5,000 - RM 10,000'),
    ('10k_25k', 'RM 10,000 - RM 25,000'),
    ('25k_50k', 'RM 25,000 - RM 50,000'),
    ('above_50k', 'Above RM 50,000'),
]

# Registration approval status (for admin)
STATUS_PENDING = 'pending'
STATUS_APPROVED = 'approved'
STATUS_REJECTED = 'rejected'

REGISTRATION_STATUS_CHOICES = [
    (STATUS_PENDING, 'Pending'),
    (STATUS_APPROVED, 'Approved'),
    (STATUS_REJECTED, 'Rejected'),
]
