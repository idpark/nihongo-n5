#!/usr/bin/env python3
"""Generate chapter illustrations for nihongo-n5 using Gemini API."""
import os, sys, time, json, base64, urllib.request, urllib.error

API_KEY = os.environ.get("GEMINI_API_KEY", "")
if not API_KEY:
    print("Set GEMINI_API_KEY environment variable")
    sys.exit(1)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
IMAGES_DIR = os.path.join(BASE_DIR, "images", "chapters")

STYLE = "Studio Ghibli anime style illustration, modern 2020s young people in contemporary casual fashion, soft warm lighting, detailed backgrounds, cinematic composition, no text in image: "

CHAPTERS = {
    1: "Two young people bowing and greeting each other politely at a university campus in Japan, cherry blossoms",
    2: "A curious student pointing at objects on a desk asking questions, classroom setting with books and stationery",
    3: "Two friends looking at a city map together, Tokyo street with signs and train station in background",
    4: "A person checking a clock at a busy Japanese train station, departure board visible",
    5: "A young woman shopping at a Japanese market stall, colorful goods with price tags displayed",
    6: "Two friends chatting happily about hobbies, one holding a guitar, the other a manga book",
    7: "Friends sitting together at a Japanese restaurant, table full of delicious dishes like sushi and ramen",
    8: "Two people enjoying beautiful weather in a Japanese park, blue sky with fluffy clouds, flowers blooming",
    9: "Friends sharing weekend stories at a cafe, one showing photos on phone, coffee cups on table",
    10: "A person riding a crowded Japanese commuter train, city skyline visible through windows",
    11: "A worried person at a Japanese hospital reception desk, kind nurse helping them",
    12: "A happy Japanese family photo - grandparents, parents, and children together in a living room",
    13: "A Korean student studying Japanese with textbooks and flashcards at a desk, determination on face",
    14: "A customer and shop clerk in a Japanese clothing store, trying on different sizes of clothes",
    15: "A happy traveler at a Japanese temple gate (torii), looking amazed at the beautiful scenery",
    16: "An old couple finding a giant peach floating in a river, Japanese countryside watercolor style",
    17: "Momotaro the peach boy with his animal companions (dog, monkey, pheasant) marching to battle oni demons",
    18: "An old bamboo cutter discovering a glowing bamboo stalk with a tiny princess inside, moonlit forest",
    19: "Beautiful Kaguya-hime ascending to the full moon in a feathered robe, celestial beings around her",
    20: "Urashima Taro riding a sea turtle underwater toward a magnificent Dragon Palace",
    21: "A beautiful crane weaving at a loom in a snowy Japanese cottage, magical glow around it",
    22: "Tiny one-inch Issun-boshi sailing in a rice bowl on a river, using a chopstick as paddle",
    23: "Inside a bright modern Japanese convenience store (konbini), shelves full of snacks and bento boxes",
    24: "A lively Japanese summer festival (matsuri) with lanterns, fireworks, and people in yukata",
    25: "A young person using a smartphone while walking through modern Tokyo, neon signs glowing",
    26: "A beautifully arranged Japanese meal with sushi, miso soup, and side dishes on a wooden table",
    27: "A thoughtful scene of nature conservation, person planting a tree in Japan with Mount Fuji in background",
}

def generate_image(prompt, output_path):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key={API_KEY}"

    payload = json.dumps({
        "contents": [{"parts": [{"text": f"Generate an illustration: {STYLE}{prompt}"}]}],
        "generationConfig": {"responseModalities": ["IMAGE", "TEXT"]}
    }).encode("utf-8")

    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})

    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read().decode("utf-8"))

        for candidate in data.get("candidates", []):
            for part in candidate.get("content", {}).get("parts", []):
                if "inlineData" in part:
                    img_data = base64.b64decode(part["inlineData"]["data"])
                    mime = part["inlineData"].get("mimeType", "image/png")
                    ext = "webp" if "webp" in mime else "png" if "png" in mime else "jpg"
                    final_path = output_path.rsplit(".", 1)[0] + "." + ext
                    with open(final_path, "wb") as f:
                        f.write(img_data)
                    print(f"  ✅ ch{os.path.basename(output_path).split('.')[0]}: {len(img_data)//1024}KB")
                    return final_path

        print(f"  ❌ No image in response")
        return None

    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")[:200]
        print(f"  ❌ HTTP {e.code}: {body}")
        if e.code == 429:
            print("  ⏳ Rate limited, waiting 30s...")
            time.sleep(30)
        return None
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return None

def main():
    os.makedirs(IMAGES_DIR, exist_ok=True)
    total = len(CHAPTERS)
    done = 0
    failed = 0

    print(f"🎨 Generating {total} chapter illustrations...\n")

    for ch, desc in CHAPTERS.items():
        output_path = os.path.join(IMAGES_DIR, f"{ch}.png")

        # Skip if exists
        existing = [f for f in os.listdir(IMAGES_DIR) if f.startswith(f"{ch}.")]
        if existing:
            print(f"  ⏭ ch{ch} already exists, skipping")
            done += 1
            continue

        print(f"  🖌 Ch.{ch}: {desc[:60]}...")
        result = generate_image(desc, output_path)

        if result:
            done += 1
        else:
            failed += 1

        time.sleep(5)

    print(f"\n{'='*40}")
    print(f"✅ Done: {done}/{total} | ❌ Failed: {failed}")

if __name__ == "__main__":
    main()
