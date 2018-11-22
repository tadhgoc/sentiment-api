SELECT
    (SELECT
        (COUNT(*) / 2) + 1
    FROM
        gfx.Seats
    WHERE
        ElectionId = :electionId) AS 'seatsRequired',

    areas.percentageCounted,
    GETDATE() as lastUpdated -- maintain same api
FROM
    (SELECT
        TOP 1 [Prim Perc Counted] AS 'percentageCounted'
    FROM
        gfx.Overall
    WHERE
        ElectionId = :electionId AND
        Title = :areaCode) AS areas
