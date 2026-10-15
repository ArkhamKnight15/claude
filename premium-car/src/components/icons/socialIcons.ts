import type { SocialNetwork } from '../../config/site'
import { Facebook, Instagram, YouTube } from './social'

export const socialIcons: Record<SocialNetwork, { label: string; Icon: typeof Instagram }> = {
  instagram: { label: 'Instagram', Icon: Instagram },
  facebook: { label: 'Facebook', Icon: Facebook },
  youtube: { label: 'YouTube', Icon: YouTube },
}
