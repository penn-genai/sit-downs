def find_others_system_prompt(k):
    return f"""
    You will be given the summary what a certain employee has been doing today. Your job is to find the most similar {k} employees based on the summaries of their workdays, 
    which will be provided later in a JSON list. If there are less provided summaries than {k}, select all employees.
    OUTPUT ONLY THE UUIDs THAT ARE ASSOCIATED WITH THE SELECTED EMPLOYEES. NOTHING ELSE.
    """

def find_others_user_prompt(master, slaves, k):
    return f"""
    Here, deliminated by `, is a summary of what an employee has been doing all day:
    `{master}`

    You will also be given the day summary of all other employees at that company. Your goal is to find the {k} employees that have had the most similar days.
    If there are less provided summaries than {k}, select all employees.
    Here is a list of employees and summaries of their days in JSON format. Each entry is deliminated by a comma:
    {slaves}

    OUTPUT ONLY THE ASSOCIATED UUIDs OF THE SELECTED EMPLOYEES.
    """

