import { Box, Typography, Link as MuiLink, Divider } from '@mui/material';
import PageHeader from '../components/PageHeader';

function IntroPage() {
  return (
    <Box>
      <PageHeader
        title="Team Name Game"
        description="Information and rules for the Team Name Game."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Intro' }]}
      />

      <Typography variant="body2" sx={{ mb: 1 }}>
        App link:{' '}
        <MuiLink href="https://tng.ltc.bcit.ca/" target="_blank" rel="noopener">
          https://tng.ltc.bcit.ca/
        </MuiLink>
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h2" sx={{ mb: 1 }}>
        Goal
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        To generate a team name that is acceptable (that can be &ldquo;lived with&rdquo;).
      </Typography>

      <Typography variant="h2" sx={{ mb: 1 }}>
        Game Play
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Teams submit words or phrases called <strong>entries</strong> to{' '}
        <strong>adjudicators</strong>, who approve or reject the proposed entries. Entries are
        grouped or positioned on the game board by a <strong>weaver</strong>; teams promote or
        demote existing entries using <strong>abilities</strong>, or generate new entries.
      </Typography>

      <Typography variant="h3" sx={{ mb: 1 }}>
        Rules
      </Typography>
      <Box component="ol" sx={{ pl: 3, mb: 3 }}>
        <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
          Teams may not submit entries to the same adjudicator twice in a row (subsequent proposals
          must go to a different adjudicator).
        </Typography>
        <Typography component="li" variant="body1">
          Teams may not submit the same entry twice (&ldquo;<em>Education</em>&rdquo; and &ldquo;
          <em>Educational</em>&rdquo; are two different entries, as are &ldquo;<em>Education</em>
          &rdquo; and &ldquo;<em>Education Innovation</em>&rdquo;).
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h2" sx={{ mb: 1 }}>
        Concepts
      </Typography>
      <Box component="dl" sx={{ mb: 3 }}>
        <Typography component="dt" variant="body1" sx={{ fontWeight: 700 }}>
          Entry
        </Typography>
        <Typography component="dd" variant="body1" sx={{ ml: 3, mb: 1.5 }}>
          A word or short phrase proposed by a BFG Team Pair that could be (or be a part of) the new
          team name. <em>Example: &ldquo;Educational&rdquo;</em>
        </Typography>

        <Typography component="dt" variant="body1" sx={{ fontWeight: 700 }}>
          Adjudicator
        </Typography>
        <Typography component="dd" variant="body1" sx={{ ml: 3, mb: 1.5 }}>
          Someone not in the BFG Team that &ldquo;approves&rdquo; or &ldquo;rejects&rdquo; entries.
        </Typography>

        <Typography component="dt" variant="body1" sx={{ fontWeight: 700 }}>
          Weaver
        </Typography>
        <Typography component="dd" variant="body1" sx={{ ml: 3, mb: 1.5 }}>
          Someone not in the BFG Team that arranges and groups entries on the Game Board.
        </Typography>

        <Typography component="dt" variant="body1" sx={{ fontWeight: 700 }}>
          Ability
        </Typography>
        <Typography component="dd" variant="body1" sx={{ ml: 3, mb: 1.5 }}>
          A special capability &ldquo;earned&rdquo; by having 4 accepted entries. Special abilities
          can be used right away or saved for later in the game.{' '}
          <em>Examples: &ldquo;Star&rdquo;, &ldquo;Nuke&rdquo;, &ldquo;Interceptor&rdquo;, &ldquo;Meh&rdquo;</em>
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h2" sx={{ mb: 1 }}>
        Abilities
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Abilities are earned after 4 approved entries. They are used to decorate the entries on the
        game board.
      </Typography>
      <Box component="dl" sx={{ mb: 3 }}>
        <Typography component="dt" variant="body1" sx={{ fontWeight: 700 }}>
          Star
        </Typography>
        <Typography component="dd" variant="body1" sx={{ ml: 3, mb: 1.5 }}>
          &ldquo;I like this entry!&rdquo; &mdash; Stars communicate that an entry is a good one.
        </Typography>

        <Typography component="dt" variant="body1" sx={{ fontWeight: 700 }}>
          Nuke
        </Typography>
        <Typography component="dd" variant="body1" sx={{ ml: 3, mb: 1.5 }}>
          &ldquo;This entry is terrible&rdquo; &mdash; Nukes are time-limited eliminators; when a
          team adds a nuke to an entry on the gameboard, that entry will be removed from the
          gameboard after the time limit is reached.
        </Typography>

        <Typography component="dt" variant="body1" sx={{ fontWeight: 700 }}>
          Interceptor
        </Typography>
        <Typography component="dd" variant="body1" sx={{ ml: 3, mb: 1.5 }}>
          &ldquo;Noooooo... I&rsquo;m going to save that entry!&rdquo; &mdash; Interceptors save
          entries from elimination. They are not pre-emptive; they can only be used after a Nuke has
          been added to an entry.
        </Typography>

        <Typography component="dt" variant="body1" sx={{ fontWeight: 700 }}>
          Meh
        </Typography>
        <Typography component="dd" variant="body1" sx={{ ml: 3, mb: 1.5 }}>
          &ldquo;Not my fav&rdquo; &mdash; Meh&rsquo;s express disapproval for an entry.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h2" sx={{ mb: 2 }}>
        Support Roles
      </Typography>

      <Typography variant="h3" sx={{ mb: 0.5 }}>
        Adjudicator
      </Typography>
      <Typography variant="body1" sx={{ mb: 0.5 }}>
        <strong>Role:</strong> Discern &ldquo;reasonableness&rdquo; of entry&rsquo;s rationale.
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
        Tasks:
      </Typography>
      <Box component="ol" sx={{ pl: 3, mb: 3 }}>
        <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
          Assess &ldquo;appropriateness&rdquo; of proposed entries based on the
          organization&rsquo;s reputation, mission, and role.
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
          Write down entries in LARGE LETTERS on a sticky note and pass to Runner.
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
          Hand out Ability cards.
        </Typography>
        <Typography component="li" variant="body1">
          Record entries and abilities on the{' '}
          <MuiLink href="https://tng.ltc.bcit.ca" target="_blank" rel="noopener">
            team-name-game app
          </MuiLink>
          .
        </Typography>
      </Box>

      <Typography variant="h3" sx={{ mb: 0.5 }}>
        Weaver
      </Typography>
      <Typography variant="body1" sx={{ mb: 0.5 }}>
        <strong>Role:</strong> Manage entries on the Game Board.
      </Typography>
      <Box
        component="img"
        src="/weaver-board.png"
        alt="Weaver game board example"
        sx={{ width: '100%', borderRadius: 2, my: 1.5 }}
      />
      <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
        Tasks:
      </Typography>
      <Box component="ol" sx={{ pl: 3, mb: 3 }}>
        <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
          Move entries from &ldquo;incoming&rdquo; to locations on the board that represent
          associations, groupings, arrangements, or connections.
        </Typography>
        <Typography component="li" variant="body1">
          Move entries (or groups of entries) around to suggest names or ideas.
        </Typography>
      </Box>

      <Typography variant="h3" sx={{ mb: 0.5 }}>
        Timer
      </Typography>
      <Typography variant="body1" sx={{ mb: 0.5 }}>
        <strong>Role:</strong> Time keeper
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
        Tasks:
      </Typography>
      <Box component="ol" sx={{ pl: 3, mb: 3 }}>
        <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
          Keep track of overall game time.
        </Typography>
        <Typography component="li" variant="body1">
          Watch for Abilities &amp; keep track of countdown timer for Nukes.
        </Typography>
      </Box>

      <Typography variant="h3" sx={{ mb: 0.5 }}>
        Runner
      </Typography>
      <Typography variant="body1" sx={{ mb: 0.5 }}>
        <strong>Role:</strong> Entry messenger
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
        Tasks:
      </Typography>
      <Box component="ol" sx={{ pl: 3, mb: 3 }}>
        <Typography component="li" variant="body1">
          Pass entries from Adjudicator to the incoming section of the game board for the Weaver.
        </Typography>
      </Box>
    </Box>
  );
}

export default IntroPage;
