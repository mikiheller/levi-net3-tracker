import type { Item } from "./types";

// The item bank, distilled from NET3 (Frazier et al.) plus a custom
// Communication & Language ladder. Items are phrased about Levi and grouped
// under each domain's question stem.
//
// difficulty: rank within a developmental ladder (ladder domains only).
// cadenceDays: how often the SAME rater should re-answer this item.
// minRaters: how many different raters we want within each cadence window.

export const ITEMS: Item[] = [
  // ── Communication & Language (custom ladder) ─────────────────────────────
  { id: "comm_01", domain: "communication", text: "Make sounds or vocalize to get someone's attention?", scale: "freq5", higherIsBetter: true, difficulty: 1, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "comm_02", domain: "communication", text: "Look at you when you speak to him?", scale: "freq5", higherIsBetter: true, difficulty: 2, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "comm_03", domain: "communication", text: "Respond to his name?", example: "Looking, turning, or acknowledging you", scale: "freq5", higherIsBetter: true, difficulty: 3, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "comm_04", domain: "communication", text: "Follow a simple one-step direction?", example: "\u201cCome here\u201d, \u201csit down\u201d, \u201cgive me the cup\u201d", scale: "freq5", higherIsBetter: true, difficulty: 4, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "comm_05", domain: "communication", text: "Use gestures to communicate?", example: "Pointing, reaching, waving, leading you by the hand", scale: "freq5", higherIsBetter: true, difficulty: 5, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "comm_06", domain: "communication", text: "Request something he wants using a word, sign, or AAC device?", scale: "freq5", higherIsBetter: true, difficulty: 6, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "comm_07", domain: "communication", text: "Imitate sounds or words when prompted?", scale: "freq5", higherIsBetter: true, difficulty: 7, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "comm_08", domain: "communication", text: "Use single words (or signs / AAC symbols) meaningfully on his own?", scale: "freq5", higherIsBetter: true, difficulty: 8, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "comm_09", domain: "communication", text: "Follow a two-step direction?", example: "\u201cGet your shoes and come to the door\u201d", scale: "freq5", higherIsBetter: true, difficulty: 9, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "comm_10", domain: "communication", text: "Name familiar people or objects?", scale: "freq5", higherIsBetter: true, difficulty: 10, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "comm_11", domain: "communication", text: "Answer simple yes / no questions?", scale: "freq5", higherIsBetter: true, difficulty: 11, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "comm_12", domain: "communication", text: "Combine two words?", example: "\u201cMore juice\u201d, \u201cgo outside\u201d", scale: "freq5", higherIsBetter: true, difficulty: 12, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "comm_13", domain: "communication", text: "Understand simple questions?", example: "\u201cWhere's your cup?\u201d", scale: "freq5", higherIsBetter: true, difficulty: 13, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "comm_14", domain: "communication", text: "Use phrases of three or more words on his own?", scale: "freq5", higherIsBetter: true, difficulty: 14, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "comm_15", domain: "communication", text: "Answer \u201cwhat\u201d or \u201cwhere\u201d questions?", scale: "freq5", higherIsBetter: true, difficulty: 15, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "comm_16", domain: "communication", text: "Ask questions on his own?", scale: "freq5", higherIsBetter: true, difficulty: 16, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "comm_17", domain: "communication", text: "Communicate about things that are not right in front of him?", example: "Past events, absent people, things in another room", scale: "freq5", higherIsBetter: true, difficulty: 17, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "comm_18", domain: "communication", text: "Hold a short back-and-forth conversation (2-3 turns)?", scale: "freq5", higherIsBetter: true, difficulty: 18, context: "any", cadenceDays: 7, minRaters: 3 },

  // ── Social Connection (NET3 Social Communication / Interaction) ──────────
  { id: "soc_01", domain: "social", text: "Start interactions with others without prompting?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "soc_02", domain: "social", text: "Prefer to be with family or familiar people rather than alone?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "soc_03", domain: "social", text: "Enjoy social interactions?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "soc_04", domain: "social", text: "Pay attention to the presence of others?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "soc_05", domain: "social", text: "Seem excited to be with familiar people?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "soc_06", domain: "social", text: "Try to be physically and emotionally connected to the people around him?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "soc_07", domain: "social", text: "Make expected eye contact?", example: "Not too brief, too intense, or looking past people", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "soc_08", domain: "social", text: "Pay attention to other people's facial expressions and body language?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "soc_09", domain: "social", text: "Imitate actions or mannerisms of others?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "soc_10", domain: "social", text: "Communicate clearly enough that you know how he feels?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "soc_11", domain: "social", text: "Offer comfort to others when they are upset?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "soc_12", domain: "social", text: "Share enjoyment about something with another person?", example: "Showing you a toy, looking back at you during a fun activity", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "soc_13", domain: "social", text: "Engage in back-and-forth play?", example: "Turn-taking games, chase, rolling a ball back and forth", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "soc_14", domain: "social", text: "Respond when others approach him?", example: "Smiling, looking, moving toward them", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "soc_15", domain: "social", text: "Seek out playful interactions with other kids?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 14, minRaters: 2 },

  // ── Cognition & Attention (NET3 ADHD/EF + DEE-SWAS-sensitive additions) ──
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
  { id: "dls_01", domain: "dls", text: "Show that he is hungry and wants to eat", scale: "independence4", higherIsBetter: true, difficulty: 1, context: "home", cadenceDays: 14, minRaters: 2 },
  { id: "dls_02", domain: "dls", text: "Drink from a cup, straw, or sippy cup", scale: "independence4", higherIsBetter: true, difficulty: 2, context: "home", cadenceDays: 14, minRaters: 2 },
  { id: "dls_03", domain: "dls", text: "Eat with a spoon or fork", scale: "independence4", higherIsBetter: true, difficulty: 3, context: "home", cadenceDays: 14, minRaters: 2 },
  { id: "dls_04", domain: "dls", text: "Wipe his face if given a cloth", scale: "independence4", higherIsBetter: true, difficulty: 4, context: "home", cadenceDays: 14, minRaters: 2 },
  { id: "dls_05", domain: "dls", text: "Undress himself", scale: "independence4", higherIsBetter: true, difficulty: 5, context: "home", cadenceDays: 14, minRaters: 2 },
  { id: "dls_06", domain: "dls", text: "Ask for food or drink when hungry or thirsty (words, signs, or gestures)", scale: "independence4", higherIsBetter: true, difficulty: 6, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "dls_07", domain: "dls", text: "Let someone know he needs the bathroom", scale: "independence4", higherIsBetter: true, difficulty: 7, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "dls_08", domain: "dls", text: "Use the toilet", scale: "independence4", higherIsBetter: true, difficulty: 8, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "dls_09", domain: "dls", text: "Stay dry during the day (bladder control)", scale: "independence4", higherIsBetter: true, difficulty: 9, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "dls_10", domain: "dls", text: "Open and close doors using knobs or handles", scale: "independence4", higherIsBetter: true, difficulty: 10, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "dls_11", domain: "dls", text: "Get a snack from where it's kept", scale: "independence4", higherIsBetter: true, difficulty: 11, context: "home", cadenceDays: 21, minRaters: 2 },
  { id: "dls_12", domain: "dls", text: "Open containers or packages", scale: "independence4", higherIsBetter: true, difficulty: 12, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "dls_13", domain: "dls", text: "Put on his shoes", scale: "independence4", higherIsBetter: true, difficulty: 13, context: "home", cadenceDays: 14, minRaters: 2 },
  { id: "dls_14", domain: "dls", text: "Use a tablet, TV remote, or other familiar device", scale: "independence4", higherIsBetter: true, difficulty: 14, context: "home", cadenceDays: 21, minRaters: 2 },
  { id: "dls_15", domain: "dls", text: "Play independently for at least two minutes", scale: "independence4", higherIsBetter: true, difficulty: 15, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "dls_16", domain: "dls", text: "Play a simple game with someone for at least five minutes", scale: "independence4", higherIsBetter: true, difficulty: 16, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "dls_17", domain: "dls", text: "Pour liquid into a cup", scale: "independence4", higherIsBetter: true, difficulty: 17, context: "home", cadenceDays: 21, minRaters: 2 },
  { id: "dls_18", domain: "dls", text: "Cover his mouth when coughing or sneezing", scale: "independence4", higherIsBetter: true, difficulty: 18, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "dls_19", domain: "dls", text: "Put away toys or materials when asked", scale: "independence4", higherIsBetter: true, difficulty: 19, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "dls_20", domain: "dls", text: "Brush his teeth", scale: "independence4", higherIsBetter: true, difficulty: 20, context: "home", cadenceDays: 14, minRaters: 2 },
  { id: "dls_21", domain: "dls", text: "Wash his hair and body in the bath or shower", scale: "independence4", higherIsBetter: true, difficulty: 21, context: "home", cadenceDays: 21, minRaters: 2 },
  { id: "dls_22", domain: "dls", text: "Dress himself", scale: "independence4", higherIsBetter: true, difficulty: 22, context: "home", cadenceDays: 14, minRaters: 2 },
  { id: "dls_23", domain: "dls", text: "Stay close to his adult in public places", scale: "independence4", higherIsBetter: true, difficulty: 23, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "dls_24", domain: "dls", text: "Adjust his behavior to the situation", example: "Quieter in a library or classroom than at the playground", scale: "independence4", higherIsBetter: true, difficulty: 24, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "dls_25", domain: "dls", text: "Walk safely in public", example: "Stops at curbs, stays aware of cars", scale: "independence4", higherIsBetter: true, difficulty: 25, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "dls_26", domain: "dls", text: "Show caution in dangerous situations", example: "Around a hot stove, sharp objects, stairs", scale: "independence4", higherIsBetter: true, difficulty: 26, context: "any", cadenceDays: 21, minRaters: 2 },

  // ── Mood & Regulation (NET3 Mood & Irritability) ─────────────────────────
  { id: "mood_01", domain: "mood", text: "Easily frustrated?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "mood_02", domain: "mood", text: "Irritable?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "mood_03", domain: "mood", text: "To lose his temper quickly?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "mood_04", domain: "mood", text: "To stay upset or agitated for a long time once upset?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "mood_05", domain: "mood", text: "Sad or down for no clear reason?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "mood_06", domain: "mood", text: "Uninterested in things he usually enjoys?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "mood_07", domain: "mood", text: "More tired than usual, without a clear reason?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "mood_08", domain: "mood", text: "To cry or become teary without an obvious trigger?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "mood_09", domain: "mood", text: "Less responsive to praise, rewards, or fun things than usual?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 10, minRaters: 2 },
  { id: "mood_10", domain: "mood", text: "Happy and content?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 7, minRaters: 3 },
  { id: "mood_11", domain: "mood", text: "To recover quickly after getting upset?", scale: "freq5", higherIsBetter: true, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "mood_12", domain: "mood", text: "To swing rapidly between high and low energy or mood?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 14, minRaters: 2 },

  // ── Challenging Behavior (NET3 Severe & Challenging Behavior) ────────────
  { id: "beh_01", domain: "behavior", text: "Aggression toward other people without injury", example: "Hitting, pushing, grabbing, biting attempts", scale: "problem5", higherIsBetter: false, context: "any", cadenceDays: 14, minRaters: 3 },
  { id: "beh_02", domain: "behavior", text: "Aggression toward other people causing injury", scale: "problem5", higherIsBetter: false, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "beh_03", domain: "behavior", text: "Throwing, kicking, or breaking things when upset", scale: "problem5", higherIsBetter: false, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "beh_04", domain: "behavior", text: "Tantrums or periods of major upset", scale: "problem5", higherIsBetter: false, context: "any", cadenceDays: 10, minRaters: 3 },
  { id: "beh_05", domain: "behavior", text: "Mild self-injury", example: "Skin picking, light self-biting, without breaking skin", scale: "problem5", higherIsBetter: false, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "beh_06", domain: "behavior", text: "Self-injury with force", example: "Head hitting or banging, hard biting", scale: "problem5", higherIsBetter: false, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "beh_07", domain: "behavior", text: "Wandering off or trying to run away if not closely watched", scale: "problem5", higherIsBetter: false, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "beh_08", domain: "behavior", text: "Refusing to follow instructions", scale: "problem5", higherIsBetter: false, context: "any", cadenceDays: 14, minRaters: 2 },
  { id: "beh_09", domain: "behavior", text: "Mouthing or eating things that aren't food", scale: "problem5", higherIsBetter: false, context: "any", cadenceDays: 14, minRaters: 2 },

  // ── Sleep (NET3 Sleep — home context; very relevant for DEE-SWAS) ────────
  { id: "slp_01", domain: "sleep", text: "Took longer than 30 minutes to fall asleep", scale: "sleepFreq5", higherIsBetter: false, context: "home", cadenceDays: 14, minRaters: 1 },
  { id: "slp_02", domain: "sleep", text: "Woke up in the middle of the night", scale: "sleepFreq5", higherIsBetter: false, context: "home", cadenceDays: 14, minRaters: 1 },
  { id: "slp_03", domain: "sleep", text: "Woke up too early and did not go back to sleep", scale: "sleepFreq5", higherIsBetter: false, context: "home", cadenceDays: 14, minRaters: 1 },
  { id: "slp_04", domain: "sleep", text: "Had restless sleep", example: "Tossing and turning, moving around the bed", scale: "sleepFreq5", higherIsBetter: false, context: "home", cadenceDays: 14, minRaters: 1 },
  { id: "slp_05", domain: "sleep", text: "Snored loudly, gasped, or paused breathing during sleep", scale: "sleepFreq5", higherIsBetter: false, context: "home", cadenceDays: 14, minRaters: 1 },
  { id: "slp_06", domain: "sleep", text: "Had night terrors or woke up seeming very frightened", scale: "sleepFreq5", higherIsBetter: false, context: "home", cadenceDays: 14, minRaters: 1 },
  { id: "slp_07", domain: "sleep", text: "Needed medication to fall asleep", scale: "sleepFreq5", higherIsBetter: false, context: "home", cadenceDays: 14, minRaters: 1 },
  { id: "slp_08", domain: "sleep", text: "Seemed tired or low-energy in the morning after a poor night", scale: "sleepFreq5", higherIsBetter: false, context: "home", cadenceDays: 14, minRaters: 1 },
  { id: "slp_09", domain: "sleep", text: "Had unusual movements or events during sleep", example: "Twitching, jerking, staring episodes, unusual awakenings", scale: "sleepFreq5", higherIsBetter: false, context: "home", cadenceDays: 7, minRaters: 1 },
  { id: "slp_10", domain: "sleep", text: "On average, about how many hours did he sleep per night?", scale: "sleepHours", higherIsBetter: true, context: "home", cadenceDays: 14, minRaters: 1 },

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

  // ── Anxiety (NET3 Anxiety, observable subset) ────────────────────────────
  { id: "anx_01", domain: "anxiety", text: "Fearful or scared without an obvious reason?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "anx_02", domain: "anxiety", text: "Nervous in new situations or with unfamiliar people?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "anx_03", domain: "anxiety", text: "Clingy with familiar people, or upset when separated from them?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "anx_04", domain: "anxiety", text: "Afraid of specific things?", example: "Certain sounds, animals, places, or objects", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "anx_05", domain: "anxiety", text: "Overwhelmed or anxious when there is too much going on?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 21, minRaters: 2 },
  { id: "anx_06", domain: "anxiety", text: "Frozen or paralyzed by fear?", scale: "freq5", higherIsBetter: false, context: "any", cadenceDays: 21, minRaters: 2 },

  // ── Motor Skills (NET3 Motor, core ladder) ───────────────────────────────
  { id: "mot_01", domain: "motor", text: "Walk independently", scale: "difficulty4", higherIsBetter: false, difficulty: 1, context: "any", cadenceDays: 28, minRaters: 2 },
  { id: "mot_02", domain: "motor", text: "Climb stairs (may use the railing)", scale: "difficulty4", higherIsBetter: false, difficulty: 2, context: "any", cadenceDays: 28, minRaters: 2 },
  { id: "mot_03", domain: "motor", text: "Pick up small objects with thumb and fingers", scale: "difficulty4", higherIsBetter: false, difficulty: 3, context: "any", cadenceDays: 28, minRaters: 2 },
  { id: "mot_04", domain: "motor", text: "Run without falling", scale: "difficulty4", higherIsBetter: false, difficulty: 4, context: "any", cadenceDays: 28, minRaters: 2 },
  { id: "mot_05", domain: "motor", text: "Turn pages in a book", scale: "difficulty4", higherIsBetter: false, difficulty: 5, context: "any", cadenceDays: 28, minRaters: 2 },
  { id: "mot_06", domain: "motor", text: "Press small buttons on a touchscreen or device", scale: "difficulty4", higherIsBetter: false, difficulty: 6, context: "any", cadenceDays: 28, minRaters: 2 },
  { id: "mot_07", domain: "motor", text: "Hold a crayon or marker and make marks on paper", scale: "difficulty4", higherIsBetter: false, difficulty: 7, context: "any", cadenceDays: 28, minRaters: 2 },
  { id: "mot_08", domain: "motor", text: "Throw a ball", scale: "difficulty4", higherIsBetter: false, difficulty: 8, context: "any", cadenceDays: 28, minRaters: 2 },
  { id: "mot_09", domain: "motor", text: "Jump over small obstacles", scale: "difficulty4", higherIsBetter: false, difficulty: 9, context: "any", cadenceDays: 28, minRaters: 2 },
  { id: "mot_10", domain: "motor", text: "Catch a ball", scale: "difficulty4", higherIsBetter: false, difficulty: 10, context: "any", cadenceDays: 28, minRaters: 2 },
  { id: "mot_11", domain: "motor", text: "Color or draw within a large outline", scale: "difficulty4", higherIsBetter: false, difficulty: 11, context: "any", cadenceDays: 28, minRaters: 2 },
  { id: "mot_12", domain: "motor", text: "Use scissors", scale: "difficulty4", higherIsBetter: false, difficulty: 12, context: "any", cadenceDays: 28, minRaters: 2 },
  { id: "mot_13", domain: "motor", text: "Fasten a zipper", scale: "difficulty4", higherIsBetter: false, difficulty: 13, context: "any", cadenceDays: 28, minRaters: 2 },

  // ── Family & Quality of Life (parents only, monthly, not in composite) ───
  { id: "qol_01", domain: "qol", text: "Levi appeared happy and content", scale: "always5", higherIsBetter: true, context: "parent", cadenceDays: 28, minRaters: 2, excludeFromComposite: true },
  { id: "qol_02", domain: "qol", text: "Levi handled daily routines and transitions well", scale: "always5", higherIsBetter: true, context: "parent", cadenceDays: 28, minRaters: 2, excludeFromComposite: true },
  { id: "qol_03", domain: "qol", text: "Levi's difficulties added stress to our home life", scale: "agree5", higherIsBetter: false, context: "parent", cadenceDays: 28, minRaters: 2, excludeFromComposite: true },
  { id: "qol_04", domain: "qol", text: "Our family was able to do social activities together", scale: "always5", higherIsBetter: true, context: "parent", cadenceDays: 28, minRaters: 2, excludeFromComposite: true },
  { id: "qol_05", domain: "qol", text: "I felt tired and without energy as a result of caregiving", scale: "agree5", higherIsBetter: false, context: "parent", cadenceDays: 28, minRaters: 2, excludeFromComposite: true },
  { id: "qol_06", domain: "qol", text: "I managed caregiving stress well", scale: "agree5", higherIsBetter: true, context: "parent", cadenceDays: 28, minRaters: 2, excludeFromComposite: true },
  { id: "qol_07", domain: "qol", text: "Over the last month, Levi's quality of life has\u2026", scale: "change5", higherIsBetter: true, context: "parent", cadenceDays: 28, minRaters: 2, excludeFromComposite: true },
  { id: "qol_08", domain: "qol", text: "Over the last month, my own quality of life has\u2026", scale: "change5", higherIsBetter: true, context: "parent", cadenceDays: 28, minRaters: 2, excludeFromComposite: true },
];

export const ITEM_MAP: Record<string, Item> = Object.fromEntries(
  ITEMS.map((i) => [i.id, i])
);
