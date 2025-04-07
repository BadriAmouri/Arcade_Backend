const supabase = require('../Config/db');



const addRegistration = async (data) => {
  const { full_name, team_name, level, motivation, ...rest } = data;

  if (!level || !motivation) {
    throw new Error("Level and motivation are required");
  }

  const insertData = { full_name, team_name, level, motivation, ...rest };

  const { data: result, error } = await supabase
    .from('registration')
    .insert([insertData]);

  if (error) throw error;
  return result;
};

const getAllRegistrations = async () => {
  const { data, error } = await supabase
    .from('registration')
    .select('*')
    .order('team_name', { ascending: true });

  if (error) throw error;
  return data;
};

const countTeamMembers = async (team_name) => {
  const { count, error } = await supabase
    .from('registration')
    .select('*', { count: 'exact', head: true })
    .eq('team_name', team_name);

  if (error) throw error;
  return count;
};

const acceptTeam = async (team_name) => {
    try {
      // Fetch all members of the team from the registration table
      const { data: members, error: fetchError } = await supabase
        .from('registration')
        .select('full_name')  // Only select the full_name field
        .eq('team_name', team_name);
  
      if (fetchError || members.length === 0) {
        throw new Error('Team not found or has no members');
      }
  
      // Extract just the names from the fetched members
      const memberNames = members.map(member => member.full_name);
      console.log("the members Names are :" , memberNames)
      console.log("the members Names are :" , JSON.stringify(memberNames))

  
      // Insert the team into the teams table
      const { error: insertError } = await supabase
        .from('teams')
        .insert([
          {
            name: team_name, // 'name' field in teams table
            members: JSON.stringify(memberNames), // Store members' names as JSONB
            total_points: 0, // Initial points for the team
          }
        ]);
  
      if (insertError) {
        throw new Error('Failed to insert into teams table');
      }
  
      // Optionally: delete the team from registration table after moving it
      // await supabase.from('registration').delete().eq('team_name', team_name);
  
      return { message: 'Team accepted and added to teams table successfully' };
    } catch (error) {
      console.error(error);
      throw new Error(error.message || 'An error occurred while accepting the team');
    }
  };

  

module.exports = {
  addRegistration,
  getAllRegistrations,
  countTeamMembers,
  acceptTeam
};
