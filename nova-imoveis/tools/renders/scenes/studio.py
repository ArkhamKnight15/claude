"""Studio compacto premium no 14º andar, com janela de canto para o skyline ao entardecer."""

import bpy

import environments
import kit
from kit import box


def build(night=False):
    kit.reset(seed=81)
    W, D, H = 6.6, 4.8, 2.8
    floor = kit.mat_wood(light=(0.7, 0.58, 0.44), dark=(0.56, 0.44, 0.32), planks=True, plank_len=1.8, plank_w=0.18,
                         direction='X', name='sfloor', rough=0.35)
    wall = kit.mat_plaster((0.86, 0.85, 0.82), name='swall')
    oak = kit.mat_wood(light=(0.7, 0.56, 0.4), dark=(0.56, 0.42, 0.28), direction='Z', name='soak', rough=0.45)
    stone = kit.mat_stone((0.9, 0.89, 0.86), (0.6, 0.58, 0.55), rough=0.2, marble=True, name='sstone', scale=0.8)
    frame = kit.mat_simple((0.05, 0.05, 0.05), rough=0.35, metal=0.4, name='sframe')
    glass = kit.mat_window_glass(name='sglass', reflect=0.08)

    box(-0.3, -0.3, -0.2, W + 0.3, D + 0.3, 0, floor, bevel=0)
    box(-0.3, -0.3, H, W + 0.3, D + 0.3, H + 0.3, kit.mat_plaster((0.9, 0.89, 0.87), name='sceil'), bevel=0)
    box(-0.3, -0.3, 0, 0, D, H, wall, bevel=0)
    box(-0.3, -0.3, 0, W + 0.3, 0, H, wall, bevel=0)
    # Janela de canto: fundo (y = D) e lateral (x = W)
    kit.glazing(0.4, D, W, D, 0, H, frame, glass, mullions=3, frame=0.04)
    kit.glazing(W, 0.3, W, D, 0, H, frame, glass, mullions=2, frame=0.04)
    box(-0.3, D, 0, 0.4, D + 0.3, H, wall, bevel=0)
    box(W, -0.3, 0, W + 0.3, 0.3, H, wall, bevel=0)
    for portal_args in (((W / 2, D + 0.2, H / 2), W, (90, 0, 0), H), ((W + 0.2, D / 2, H / 2), D, (90, 0, 90), H)):
        location, size, rotation, size_y = portal_args
        portal = kit.area_light(location, size, 1.0, rotation=rotation, size_y=size_y)
        portal.data.cycles.is_portal = True
    environments.city(origin_z=46, y0=70, seed=21, lit=0.45 if night else 0.03, glow=4.0 if night else 1.5,
                      haze=((0.36, 0.38, 0.48), 120, 1500) if night else ((0.78, 0.66, 0.6), 120, 1500), count=520)
    kit.turn_around(lambda: environments.city(origin_z=46, y0=90, seed=22, lit=0.45 if night else 0.03,
                                              glow=4.0 if night else 1.5, count=300,
                                              haze=((0.36, 0.38, 0.48), 120, 1500) if night else ((0.78, 0.66, 0.6), 120, 1500)),
                    degrees=-90)

    # Cozinha linear na parede esquerda (x = 0)
    box(0, 0.3, 0, 0.62, 3.0, 0.88, oak, bevel=0.004)
    box(0, 0.25, 0.88, 0.65, 3.05, 0.92, stone, bevel=0.003)
    box(0, 0.3, 1.5, 0.36, 3.0, 2.3, oak, bevel=0.004)
    box(0.0, 0.25, 0.92, 0.02, 3.05, 1.5, stone, bevel=0)
    box(0.02, 1.2, 0.93, 0.5, 1.8, 0.935, kit.mat_simple((0.02, 0.02, 0.02), rough=0.1, name='cooktop'), bevel=0)
    kit.area_light((0.3, 1.65, 1.48), 2.6, 25, size_y=0.08, color=(1.0, 0.84, 0.64))
    kit.vase(0.3, 2.6, 0.92, height=0.24, radius=0.06)
    # Mesa redonda junto à janela
    kit.round_table(2.3, 3.6, radius=0.5)
    chair = kit.mat_fabric((0.55, 0.5, 0.44), name='schair')
    for cx, cy in ((1.55, 3.4), (2.75, 4.15)):
        kit.soft_box(cx - 0.22, cy - 0.22, 0.44, cx + 0.22, cy + 0.22, 0.5, chair, 0.03)
        for dx in (-0.18, 0.16):
            for dy in (-0.18, 0.16):
                box(cx + dx, cy + dy, 0, cx + dx + 0.02, cy + dy + 0.02, 0.44, frame, bevel=0)
    kit.pendant(2.3, 3.6, H, drop=0.9, radius=0.16, shape='dome')
    # Estar
    kit.rug(3.2, 0.6, 6.2, 3.0, color=(0.7, 0.66, 0.6))
    kit.sofa(5.8, 1.2, length=2.4, depth=0.9, rotation=180, fabric=kit.mat_fabric((0.4, 0.42, 0.42), name='ssofa'))
    kit.coffee_table(4.6, 1.75, radius=0.4, height=0.34)
    kit.books(4.45, 1.7, 0.34, length=0.25, depth=0.18, seed=5)
    kit.floor_lamp(6.2, 0.5, glow=4)
    kit.potted_plant(6.2, 4.4, height=1.5, seed=31)
    # Quarto atrás de painel ripado (parede direita, fundo)
    kit.slats(3.0, 3.1, 3.0, 4.8, 0, H, 22, oak, depth=0.05, axis='Y')
    kit.bed(5.1, 3.15, width=1.6, length=2.0, rotation=90)

    if night:
        kit.sky(-4, 250, strength=1.6, sun_energy=0, air=1.0, dust=1.0, ozone=3.0)
        kit.area_light((W / 2, D / 2, H - 0.05), 3, 40, size_y=2.5, color=(1.0, 0.8, 0.6))
    else:
        kit.sky(4, 260, strength=0.3, sun_energy=2.8, sun_color=(1.0, 0.62, 0.38), dust=1.6)
        kit.area_light((W / 2, D / 2, H - 0.05), 3, 60, size_y=2.5, color=(1.0, 0.86, 0.72))
    bpy.context.scene.cycles.diffuse_bounces = 6


def main(shots=None):
    shots = shots or ['living', 'kitchen', 'bed', 'view']
    day = [s for s in shots if s != 'view']
    if day:
        build(night=False)
        if 'living' in day:
            kit.camera((0.9, 0.35, 1.3), target=(5.8, 4.3, 1.2), lens=20, shift_y=0.03)
            kit.render('studio-living', 2400, 1600, samples=128, exposure=0.5)
        if 'kitchen' in day:
            kit.camera((5.4, 2.0, 1.4), target=(0.0, 1.4, 1.1), lens=24, shift_y=0.02)
            kit.render('studio-kitchen', 2400, 1600, samples=128, exposure=0.5)
        if 'bed' in day:
            kit.camera((1.0, 2.2, 1.35), target=(5.0, 4.6, 1.0), lens=24, shift_y=0.02)
            kit.render('studio-bed', 2400, 1600, samples=128, exposure=0.5)
    if 'view' in shots:
        build(night=True)
        kit.camera((1.6, 1.0, 1.35), target=(6.6, 4.8, 1.4), lens=26)
        kit.render('studio-view', 2400, 1600, samples=128, exposure=0.6)
