SELECT
    pn.PartyName AS 'partyName',
    RTRIM(LTRIM(o.Party)) AS 'partyAbbreviation',
    'rgb(' +  CAST(pc.Red as  varchar)  + ',' +  CAST(pc.Green as  varchar)  + ',' +  CAST(pc.Blue as  varchar)  + ')' as 'partyColor',
    [Seats Won] + [Seats Ahead] AS 'seatsWonAhead'
FROM
    gfx.Overall o
    INNER JOIN gfx.PartyNames pn ON
        o.Party = pn.Party AND
        o.ElectionId = pn.ElectionId
    LEFT JOIN gfx.partyColours pc ON
        o.Party = pc.Party AND
        o.ElectionId = pc.ElectionId
WHERE
    o.ElectionId = :electionId AND
    o.Title = :areaCode
