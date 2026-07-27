import type { Item as ItemT } from "./types";

// The item bank, distilled from NET3 (Frazier et al.) plus custom
// communication ladders built for very early speech re-emergence (DEE-SWAS).
// Every item shares one stem (STEM in scales.ts): "This past week, how often
// did he…" — item texts are fragments that continue it.
//
// difficulty: rank within a developmental ladder (ladder domains only).
// cadenceDays: how often the SAME rater should re-answer this item.
// minRaters: how many different raters we want within each cadence window.

export const ITEMS: ItemT[] = [
  // ── Verbal Speech (custom ladder) ────────────────────────────────────────
  { id: "sp_01", domain: "speech", text: "Make vocal sounds directed at a person?", example: "To engage someone or get their attention", scale: "freq5", higherIsBetter: true, difficulty: 1, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "sp_02", domain: "speech", text: "Try to say a word when prompted?", example: "Any attempt counts \u2014 moving his lips, producing any sound", scale: "freq5", higherIsBetter: true, difficulty: 2, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "sp_03", domain: "speech", text: "Make a sound resembling a target word when prompted?", example: "\u201cMoh\u201d for \u201cmore\u201d", scale: "freq5", higherIsBetter: true, difficulty: 3, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "sp_04", domain: "speech", text: "Make a sound, on his own, that seemed tied to a specific meaning?", example: "\u201cWuh\u201d while reaching for water", scale: "freq5", higherIsBetter: true, difficulty: 4, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "sp_05", domain: "speech", text: "Use the same sound consistently for the same thing?", example: "\u201cMoh\u201d reliably means more, across days", scale: "freq5", higherIsBetter: true, difficulty: 5, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "sp_06", domain: "speech", text: "Say \u201cno\u201d (or \u201cyes\u201d) meaningfully, in a context where it made sense?", scale: "freq5", higherIsBetter: true, difficulty: 6, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "sp_07", domain: "speech", text: "Say a recognizable word, in context, unprompted?", scale: "freq5", higherIsBetter: true, difficulty: 7, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "sp_08", domain: "speech", text: "Imitate words reliably when prompted?", scale: "freq5", higherIsBetter: true, difficulty: 8, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "sp_09", domain: "speech", text: "Use several different words or word-approximations meaningfully?", scale: "freq5", higherIsBetter: true, difficulty: 9, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "sp_10", domain: "speech", text: "Say words clearly enough that someone who doesn't know him could understand?", scale: "freq5", higherIsBetter: true, difficulty: 10, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "sp_11", domain: "speech", text: "Combine two words?", example: "\u201cMore juice\u201d, \u201cgo outside\u201d", scale: "freq5", higherIsBetter: true, difficulty: 11, context: "any", cadenceDays: 7, minRaters: 3 },

  // ── AAC (custom ladder: purposefulness, correctness, navigation) ─────────
  { id: "aac_01", domain: "aac", text: "Use the AAC to request something?", example: "Any selection counts", scale: "freq5", higherIsBetter: true, difficulty: 1, context: "any", cadenceDays: 7, minRaters: 2 },
  { id: "aac_02", domain: "aac", text: "Accept or use the thing he selected on the AAC?", example: "Picks \u201cchips\u201d, then actually eats the chips happily", scale: "freq5", higherIsBetter: true, difficulty: 2, context: "any", cadenceDays: 7, minRaters: 2 },
  { id: "aac_03", domain: "aac", text: "Answer a checkable question correctly at least half the time, with the right AAC page already open?", example: "\u201cWhat color is this bird?\u201d pointing at a flamingo \u2192 picks pink", scale: "freq5", higherIsBetter: true, difficulty: 3, context: "any", cadenceDays: 7, minRaters: 2 },
  { id: "aac_04", domain: "aac", text: "Answer checkable questions correctly nearly every time, with the right AAC page already open?", scale: "freq5", higherIsBetter: true, difficulty: 4, context: "any", cadenceDays: 7, minRaters: 2 },
  { id: "aac_05", domain: "aac", text: "Navigate the AAC on his own to say something?", example: "Multiple steps, e.g. groups \u2192 colors \u2192 pink, without you pre-opening the page", scale: "freq5", higherIsBetter: true, difficulty: 5, context: "any", cadenceDays: 7, minRaters: 2 },
  { id: "aac_06", domain: "aac", text: "Answer a checkable question correctly, navigating the AAC on his own?", scale: "freq5", higherIsBetter: true, difficulty: 6, context: "any", cadenceDays: 7, minRaters: 2 },
  { id: "aac_07", domain: "aac", text: "Use the AAC to comment or share \u2014 not just to request?", example: "\u201cLook\u201d, \u201cfunny\u201d, naming what he sees", scale: "freq5", higherIsBetter: true, difficulty: 7, context: "any", cadenceDays: 7, minRaters: 2 },
  { id: "aac_08", domain: "aac", text: "Combine two or more AAC buttons meaningfully?", example: "\u201cMore\u201d + \u201cjuice\u201d", scale: "freq5", higherIsBetter: true, difficulty: 8, context: "any", cadenceDays: 7, minRaters: 2 },

  // ── Gestures & Body (custom ladder) ──────────────────────────────────────
  { id: "ges_01", domain: "gesture", text: "Lead you by the hand (or bring you) to what he wanted?", scale: "freq5", higherIsBetter: true, difficulty: 1, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "ges_02", domain: "gesture", text: "Use reaching, pushing away, or turning away to show what he wanted or didn't want?", scale: "freq5", higherIsBetter: true, difficulty: 2, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "ges_03", domain: "gesture", text: "Point at things he wanted?", scale: "freq5", higherIsBetter: true, difficulty: 3, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "ges_04", domain: "gesture", text: "Shake or nod his head for no / yes?", scale: "freq5", higherIsBetter: true, difficulty: 4, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "ges_05", domain: "gesture", text: "Use social gestures?", example: "Waving hi/bye, blowing kisses, high-five", scale: "freq5", higherIsBetter: true, difficulty: 5, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "ges_06", domain: "gesture", text: "Point at or show you something just to share it?", example: "Not to get it \u2014 \u201clook at that!\u201d", scale: "freq5", higherIsBetter: true, difficulty: 6, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "ges_07", domain: "gesture", text: "Combine gestures with eye contact or sounds to communicate?", example: "Looks at you, then at the thing, back at you", scale: "freq5", higherIsBetter: true, difficulty: 7, context: "any", cadenceDays: 10, minRaters: 2 },

  // ── Understanding / Receptive (NET3 + custom, ladder) ────────────────────
  { id: "rec_01", domain: "receptive", text: "Respond to his name?", example: "Looking, turning, or acknowledging you", scale: "freq5", higherIsBetter: true, difficulty: 1, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "rec_02", domain: "receptive", text: "React to familiar words or routine phrases?", example: "Gets excited at \u201cbath time\u201d, heads to the door at \u201clet's go\u201d", scale: "freq5", higherIsBetter: true, difficulty: 2, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "rec_03", domain: "receptive", text: "Follow a simple one-step direction?", example: "\u201cCome here\u201d, \u201csit down\u201d", scale: "freq5", higherIsBetter: true, difficulty: 3, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "rec_04", domain: "receptive", text: "Look at or point to the right object or person when named?", scale: "freq5", higherIsBetter: true, difficulty: 4, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "rec_05", domain: "receptive", text: "Follow a direction involving an object?", example: "\u201cGet your shoes\u201d", scale: "freq5", higherIsBetter: true, difficulty: 5, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "rec_06", domain: "receptive", text: "Follow a two-step direction?", example: "\u201cGet your shoes and come to the door\u201d", scale: "freq5", higherIsBetter: true, difficulty: 6, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "rec_07", domain: "receptive", text: "Understand simple questions?", example: "\u201cWhere's your cup?\u201d", scale: "freq5", higherIsBetter: true, difficulty: 7, context: "any", cadenceDays: 7, minRaters: 3 },

  // ── Social Connection (NET3 Social Communication / Interaction) ──────────
  { id: "soc_01", domain: "social", text: "Start interactions with others without prompting?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "soc_02", domain: "social", text: "Prefer being with family or familiar people over being alone?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "soc_03", domain: "social", text: "Seem to enjoy social interactions?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "soc_04", domain: "social", text: "Pay attention to the presence of others?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "soc_05", domain: "social", text: "Seem excited to be with familiar people?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "soc_06", domain: "social", text: "Try to be physically and emotionally connected to the people around him?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "soc_07", domain: "social", text: "Make expected eye contact?", example: "Not too brief, too intense, or looking past people", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "soc_08", domain: "social", text: "Pay attention to other people's facial expressions and body language?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "soc_09", domain: "social", text: "Imitate actions or mannerisms of others?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "soc_10", domain: "social", text: "Communicate clearly enough that you knew how he felt?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "soc_11", domain: "social", text: "Offer comfort to others when they were upset?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "soc_12", domain: "social", text: "Share enjoyment about something with another person?", example: "Showing you a toy, looking back at you during a fun activity", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "soc_13", domain: "social", text: "Engage in back-and-forth play?", example: "Turn-taking games, chase, rolling a ball back and forth", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "soc_14", domain: "social", text: "Respond when others approached him?", example: "Smiling, looking, moving toward them", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "soc_15", domain: "social", text: "Seek out playful interactions with other kids?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 14, minRaters: 2 },

  // ── Cognition & Attention (custom + NET3 ADHD items) ─────────────────────
  { id: "cog_01", domain: "cognition", text: "Seem alert and \u201cpresent\u201d \u2014 tuned in to what's happening around him?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "cog_02", domain: "cognition", text: "Respond quickly when spoken to or shown something?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "cog_03", domain: "cognition", text: "Stay focused on one activity for several minutes?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "cog_04", domain: "cognition", text: "Seem easily distracted?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "cog_05", domain: "cognition", text: "Seem to be in constant motion or unable to sit still?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "cog_06", domain: "cognition", text: "Notice changes in his environment?", example: "A new toy, moved furniture, someone new in the room", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "cog_07", domain: "cognition", text: "Remember where things are?", example: "Finds a toy he put down earlier, knows where snacks live", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "cog_08", domain: "cognition", text: "Pick up something new?", example: "A new step in a routine, a new sign, a new skill", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "cog_09", domain: "cognition", text: "Solve little problems on his own?", example: "Moves a stool to reach something, works a latch or fastener", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "cog_10", domain: "cognition", text: "Stop doing something when asked to stop?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "cog_11", domain: "cognition", text: "Sit through a short activity like a book or a song?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "cog_12", domain: "cognition", text: "Seem foggy, sleepy, or hard to reach during the day?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 7, minRaters: 3 },

  // ── Daily Living Skills (NET3 Practical Living Skills, ladder) ───────────
  // Asked as frequency of doing it on his own, to fit the shared stem.
  { id: "dls_01", domain: "dls", text: "Show that he was hungry and wanted to eat?", scale: "freq5", higherIsBetter: true, difficulty: 1, context: "home", cadenceDays: 14, minRaters: 2 },
  { id: "dls_02", domain: "dls", text: "Drink from a cup, straw, or sippy cup on his own?", scale: "freq5", higherIsBetter: true, difficulty: 2, context: "home", cadenceDays: 14, minRaters: 2 },
  { id: "dls_03", domain: "dls", text: "Eat with a spoon or fork on his own?", scale: "freq5", higherIsBetter: true, difficulty: 3, context: "home", cadenceDays: 14, minRaters: 2 },
  { id: "dls_04", domain: "dls", text: "Wipe his face on his own when given a cloth?", scale: "freq5", higherIsBetter: true, difficulty: 4, context: "home", cadenceDays: 14, minRaters: 2 },
  { id: "dls_05", domain: "dls", text: "Undress himself without help?", scale: "freq5", higherIsBetter: true, difficulty: 5, context: "home", cadenceDays: 14, minRaters: 2 },
  { id: "dls_06", domain: "dls", text: "Ask for food or drink when hungry or thirsty?", example: "Words, signs, or gestures", scale: "freq5", higherIsBetter: true, difficulty: 6, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "dls_07", domain: "dls", text: "Let someone know he needed the bathroom?", scale: "freq5", higherIsBetter: true, difficulty: 7, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "dls_08", domain: "dls", text: "Use the toilet without help?", scale: "freq5", higherIsBetter: true, difficulty: 8, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "dls_09", domain: "dls", text: "Stay dry during the day?", scale: "freq5", higherIsBetter: true, difficulty: 9, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "dls_10", domain: "dls", text: "Open and close doors using knobs or handles?", scale: "freq5", higherIsBetter: true, difficulty: 10, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "dls_11", domain: "dls", text: "Get a snack on his own from where it's kept?", scale: "freq5", higherIsBetter: true, difficulty: 11, context: "home", cadenceDays: 21, minRaters: 2 },
  { id: "dls_12", domain: "dls", text: "Open containers or packages on his own?", scale: "freq5", higherIsBetter: true, difficulty: 12, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "dls_13", domain: "dls", text: "Put on his shoes without help?", scale: "freq5", higherIsBetter: true, difficulty: 13, context: "home", cadenceDays: 14, minRaters: 2 },
  { id: "dls_14", domain: "dls", text: "Use a tablet, TV remote, or other familiar device on his own?", scale: "freq5", higherIsBetter: true, difficulty: 14, context: "home", cadenceDays: 21, minRaters: 2 },
  { id: "dls_15", domain: "dls", text: "Play by himself for at least two minutes?", scale: "freq5", higherIsBetter: true, difficulty: 15, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "dls_16", domain: "dls", text: "Play a simple game with someone for at least five minutes?", scale: "freq5", higherIsBetter: true, difficulty: 16, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "dls_17", domain: "dls", text: "Pour liquid into a cup without help?", scale: "freq5", higherIsBetter: true, difficulty: 17, context: "home", cadenceDays: 21, minRaters: 2 },
  { id: "dls_18", domain: "dls", text: "Cover his mouth when coughing or sneezing?", scale: "freq5", higherIsBetter: true, difficulty: 18, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "dls_19", domain: "dls", text: "Put away toys or materials when asked?", scale: "freq5", higherIsBetter: true, difficulty: 19, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "dls_20", domain: "dls", text: "Brush his teeth without help?", scale: "freq5", higherIsBetter: true, difficulty: 20, context: "home", cadenceDays: 14, minRaters: 2 },
  { id: "dls_21", domain: "dls", text: "Wash his hair and body in the bath or shower without help?", scale: "freq5", higherIsBetter: true, difficulty: 21, context: "home", cadenceDays: 21, minRaters: 2 },
  { id: "dls_22", domain: "dls", text: "Dress himself without help?", scale: "freq5", higherIsBetter: true, difficulty: 22, context: "home", cadenceDays: 14, minRaters: 2 },
  { id: "dls_23", domain: "dls", text: "Stay close to his adult in public places?", scale: "freq5", higherIsBetter: true, difficulty: 23, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "dls_24", domain: "dls", text: "Adjust his behavior to the situation?", example: "Quieter in a library or classroom than at the playground", scale: "freq5", higherIsBetter: true, difficulty: 24, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "dls_25", domain: "dls", text: "Walk safely in public?", example: "Stops at curbs, stays aware of cars", scale: "freq5", higherIsBetter: true, difficulty: 25, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "dls_26", domain: "dls", text: "Show caution in dangerous situations?", example: "Around a hot stove, sharp objects, stairs", scale: "freq5", higherIsBetter: true, difficulty: 26, context: "any", cadenceDays: 21, minRaters: 2 },

  // ── Repetitive & Sensory (NET3 RRB items) ────────────────────────────────
  { id: "rrb_01", domain: "rrb", text: "Flap his hands or move them in an unusual way?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "rrb_02", domain: "rrb", text: "Repetitively jump, rock, spin, or do other whole-body motions?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "rrb_03", domain: "rrb", text: "Repeat sounds, words, or lines from videos?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "rrb_04", domain: "rrb", text: "Play with objects repetitively, without a clear purpose?", example: "Lining things up, spinning wheels, opening and closing doors", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "rrb_05", domain: "rrb", text: "Get upset by changes in routine?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "rrb_06", domain: "rrb", text: "Have difficulty transitioning from one activity to another?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 14, minRaters: 3 },
  { id: "rrb_07", domain: "rrb", text: "Insist on rituals or doing things a very specific way?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "rrb_08", domain: "rrb", text: "Seem overly sensitive to loud noises?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "rrb_09", domain: "rrb", text: "Get upset in crowded or busy places?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "rrb_10", domain: "rrb", text: "Show strong dislike of certain textures, foods, or smells?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "rrb_11", domain: "rrb", text: "Seem fascinated by sensory experiences?", example: "Staring at lights, fans, running water, spinning objects", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "rrb_12", domain: "rrb", text: "Seem fixated on one interest or activity?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 21, minRaters: 2 },

  // ── Motor Skills (NET3 Motor, core ladder) ───────────────────────────────
  // Asked as frequency of successful performance, to fit the shared stem.
  { id: "mot_01", domain: "motor", text: "Walk steadily without support?", scale: "freq5", higherIsBetter: true, difficulty: 1, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "mot_02", domain: "motor", text: "Climb stairs smoothly?", example: "Using the railing is fine", scale: "freq5", higherIsBetter: true, difficulty: 2, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "mot_03", domain: "motor", text: "Pick up small objects with his thumb and fingers?", scale: "freq5", higherIsBetter: true, difficulty: 3, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "mot_04", domain: "motor", text: "Run without falling?", scale: "freq5", higherIsBetter: true, difficulty: 4, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "mot_05", domain: "motor", text: "Turn pages in a book?", scale: "freq5", higherIsBetter: true, difficulty: 5, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "mot_06", domain: "motor", text: "Press small buttons on a touchscreen accurately?", scale: "freq5", higherIsBetter: true, difficulty: 6, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "mot_07", domain: "motor", text: "Hold a crayon or marker and make marks on paper?", scale: "freq5", higherIsBetter: true, difficulty: 7, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "mot_08", domain: "motor", text: "Throw a ball?", scale: "freq5", higherIsBetter: true, difficulty: 8, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "mot_09", domain: "motor", text: "Jump over small obstacles?", scale: "freq5", higherIsBetter: true, difficulty: 9, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "mot_10", domain: "motor", text: "Catch a ball?", scale: "freq5", higherIsBetter: true, difficulty: 10, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "mot_11", domain: "motor", text: "Color or draw within a large outline?", scale: "freq5", higherIsBetter: true, difficulty: 11, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "mot_12", domain: "motor", text: "Use scissors?", scale: "freq5", higherIsBetter: true, difficulty: 12, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "mot_13", domain: "motor", text: "Fasten a zipper?", scale: "freq5", higherIsBetter: true, difficulty: 13, context: "any", cadenceDays: 14, minRaters: 2 },
];

export const ITEM_MAP: Record<string, ItemT> = Object.fromEntries(
  ITEMS.map((i) => [i.id, i])
);
